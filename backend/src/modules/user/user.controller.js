'use strict';

const crypto = require('crypto');
const { Op } = require('sequelize');
const db = require('../../models');
const {
  AppError,
  NotFoundError,
  ForbiddenError,
} = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');
const { logActivity } = require('../../services/activityLogger');
const { notifyUser } = require('../../services/notificationService');

// Fields a user can update on their own row via PUT /api/users/:userID.
// `profilePhotoAttachmentID` is allowed so the Profile page can manage
// the photo without granting role/email/customerID/isActive write access.
const SELF_ALLOWED_UPDATE_FIELDS = ['firstName', 'lastName', 'profilePhotoAttachmentID'];

function generateTempPassword() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
  const digits = '23456789';
  const all = letters + digits;
  const pickRandom = (alphabet, n) => {
    const bytes = crypto.randomBytes(n);
    let out = '';
    for (let i = 0; i < n; i += 1) out += alphabet[bytes[i] % alphabet.length];
    return out;
  };
  // 10 random alphanumerics + 1 forced letter + 1 forced digit = 12 chars,
  // guarantees the letter+digit rule even if the random portion missed one.
  return pickRandom(all, 10) + pickRandom(letters, 1) + pickRandom(digits, 1);
}

async function list(req, res) {
  const { page, limit, search, role, isActive, customerID, sort, order } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = {};
  if (role) where.role = role;
  if (typeof isActive === 'boolean') where.isActive = isActive;
  if (customerID) where.customerID = customerID;
  if (search) {
    where[Op.or] = [
      { firstName: { [Op.iLike]: `%${search}%` } },
      { lastName: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { rows, count } = await db.User.findAndCountAll({
    where,
    limit,
    offset,
    order: [[sort, order.toUpperCase()]],
    include: [
      {
        model: db.Customer,
        as: 'customer',
        attributes: ['customerID', 'name'],
        // LEFT JOIN — admin/staff users have no customer; without `required:
        // false`, Customer's default scope forces an INNER JOIN and drops them.
        required: false,
      },
      {
        model: db.Attachment,
        as: 'profilePhoto',
        // Most users have no photo — LEFT JOIN keeps them in the result.
        required: false,
      },
    ],
  });

  res.json({
    success: true,
    data: rows,
    meta: buildMeta({ total: count, page, limit }),
  });
}

async function getOne(req, res) {
  const { userID } = req.validated.params;
  const isStaff = req.user.role === 'ADMIN' || req.user.role === 'MANAGER';
  const isSelf = req.user.userID === userID;
  if (!isStaff && !isSelf) {
    throw new ForbiddenError('Cannot view other users');
  }

  const user = await db.User.findByPk(userID, {
    include: [
      {
        model: db.Customer,
        as: 'customer',
        attributes: ['customerID', 'name'],
        // LEFT JOIN — admin/staff users have no customer; without `required:
        // false`, Customer's default scope forces an INNER JOIN and drops them.
        required: false,
      },
      {
        model: db.Attachment,
        as: 'profilePhoto',
        // Most users have no photo — LEFT JOIN keeps them in the result.
        required: false,
      },
    ],
  });
  if (!user) throw new NotFoundError('User');
  res.json({ success: true, data: user });
}

async function create(req, res) {
  const body = { ...req.validated.body, mustChangePassword: true };
  const user = await db.User.create(body, { userId: req.user.userID });

  // Welcome notification — fire-and-forget. The new user sees this on first
  // sign-in. Failure cannot block the create response.
  notifyUser(user.userID, {
    type: 'INFO',
    priority: 'LOW',
    title: 'Welcome to LIMS',
    message: 'Your account has been created. Get started by exploring the dashboard.',
    link: '/dashboard',
    entityType: 'user',
    entityID: user.userID,
  }).catch((err) =>
    console.error('[notify] welcome failed', { userID: user.userID, message: err.message }),
  );

  // Reload to drop the password attribute (default scope) + include relations.
  const fresh = await db.User.findByPk(user.userID, {
    include: [
      { model: db.Customer, as: 'customer', attributes: ['customerID', 'name'], required: false },
      { model: db.Attachment, as: 'profilePhoto', required: false },
    ],
  });
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: fresh,
  });
}

async function update(req, res) {
  const { userID } = req.validated.params;
  const isAdmin = req.user.role === 'ADMIN';
  const isSelf = req.user.userID === userID;
  if (!isAdmin && !isSelf) {
    throw new ForbiddenError('Cannot update other users');
  }

  const body = req.validated.body;

  if (!isAdmin) {
    for (const key of Object.keys(body)) {
      if (!SELF_ALLOWED_UPDATE_FIELDS.includes(key)) {
        throw new ForbiddenError(`Field '${key}' cannot be updated by self`);
      }
    }
  }

  const user = await db.User.findByPk(userID);
  if (!user) throw new NotFoundError('User');

  // Role/customerID consistency check (admin-only fields)
  if (isAdmin && ('role' in body || 'customerID' in body)) {
    const mergedRole = 'role' in body ? body.role : user.role;
    const mergedCustomerID = 'customerID' in body ? body.customerID : user.customerID;
    if (mergedRole === 'CUSTOMER' && !mergedCustomerID) {
      throw new AppError('customerID is required when role is CUSTOMER', 422);
    }
    if (mergedRole !== 'CUSTOMER' && mergedCustomerID) {
      throw new AppError('customerID must be null when role is not CUSTOMER', 422);
    }
  }

  // Profile photo flip — if the FK changes, hard-delete the OLD attachment in
  // the same transaction so we never leave orphan rows behind. Attachments
  // are file storage, not business records (see ADR-attachments-storage-strategy).
  const photoChanging =
    'profilePhotoAttachmentID' in body
    && body.profilePhotoAttachmentID !== user.profilePhotoAttachmentID;
  const oldPhotoID = photoChanging ? user.profilePhotoAttachmentID : null;

  // Detect non-photo field changes for the PROFILE_UPDATED activity. Photo
  // changes get their own PHOTO_UPDATED activity below.
  const nonPhotoChangedKeys = Object.keys(body).filter(
    (k) => k !== 'profilePhotoAttachmentID' && body[k] !== user[k],
  );

  await db.sequelize.transaction(async (t) => {
    await user.auditedUpdate(body, req.user.userID, { transaction: t });
    if (oldPhotoID) {
      await db.Attachment.destroy({
        where: { attachmentID: oldPhotoID },
        transaction: t,
      });
    }
  });

  // Self-edit activity: log to the user's own feed. Admin edits of OTHER
  // users emit only AuditLog (already fired by the model hooks above).
  if (req.user.userID === userID) {
    if (nonPhotoChangedKeys.length > 0) {
      await logActivity({
        userID,
        actionType: 'PROFILE_UPDATED',
        label: 'Profile updated',
        description: `Updated: ${nonPhotoChangedKeys.join(', ')}.`,
        metadata: { fieldsChanged: nonPhotoChangedKeys },
        req,
      });
    }
    if (photoChanging) {
      const removed = body.profilePhotoAttachmentID === null;
      await logActivity({
        userID,
        actionType: 'PHOTO_UPDATED',
        label: removed ? 'Profile photo removed' : 'Profile photo updated',
        description: removed
          ? 'You removed your profile photo.'
          : 'You updated your profile photo.',
        req,
      });
    }
  }

  // Reload with profilePhoto include so the response carries the new photo.
  const fresh = await db.User.findByPk(userID, {
    include: [
      { model: db.Customer, as: 'customer', attributes: ['customerID', 'name'], required: false },
      { model: db.Attachment, as: 'profilePhoto', required: false },
    ],
  });
  res.json({
    success: true,
    message: 'User updated successfully',
    data: fresh,
  });
}

async function softDelete(req, res) {
  const { userID } = req.validated.params;
  if (req.user.userID === userID) {
    throw new ForbiddenError('Cannot delete your own user');
  }
  const user = await db.User.findByPk(userID);
  if (!user) throw new NotFoundError('User');

  await user.softDelete(req.user.userID);
  await db.RefreshToken.update(
    { revokedAt: new Date() },
    { where: { userID, revokedAt: null } },
  );
  res.status(204).send();
}

async function resetPassword(req, res) {
  const { userID } = req.validated.params;
  const { newPassword } = req.validated.body;

  const target = await db.User.unscoped().findByPk(userID);
  if (!target) throw new NotFoundError('User');

  const tempPassword = newPassword || generateTempPassword();
  await target.auditedUpdate(
    {
      password: tempPassword,
      mustChangePassword: true,
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
    req.user.userID,
  );

  await db.RefreshToken.update(
    { revokedAt: new Date() },
    { where: { userID, revokedAt: null } },
  );

  // Logged on the TARGET user's timeline — a password reset by an admin is
  // an event that happened TO the target, not by them. The admin's action
  // is captured separately in AuditLog.
  await logActivity({
    userID: target.userID,
    actionType: 'PASSWORD_RESET',
    label: 'Password reset by admin',
    description: 'An administrator reset your password. You will be required to change it on next sign-in.',
    metadata: { resetByUserID: req.user.userID },
    req,
  });

  // Heads-up notification to the target user. Routed to the change-password
  // page since they'll be forced through it on next sign-in anyway.
  notifyUser(target.userID, {
    type: 'WARNING',
    priority: 'HIGH',
    title: 'Password Reset',
    message: 'Your password was reset by an administrator. Please change it on next login.',
    link: '/change-password',
    triggeredBy: req.user.userID,
    entityType: 'user',
    entityID: target.userID,
  }).catch((err) =>
    console.error('[notify] password-reset failed', { userID: target.userID, message: err.message }),
  );

  res.json({
    success: true,
    message: 'Password reset. Share this temporary password out-of-band; it will not be shown again.',
    data: {
      userID: target.userID,
      tempPassword,
      mustChangePassword: true,
    },
  });
}

module.exports = { list, getOne, create, update, softDelete, resetPassword };
