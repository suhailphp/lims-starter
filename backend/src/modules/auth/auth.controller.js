'use strict';

const db = require('../../models');
const { UnauthorizedError } = require('../../utils/errors');
const { logActivity } = require('../../services/activityLogger');
const { notifyUser } = require('../../services/notificationService');
const {
  signAccessToken,
  generateRefreshToken,
  hashRefreshToken,
  getRefreshExpiresMs,
  getAccessExpiresInSeconds,
} = require('../../utils/jwt');

async function issueTokenPair(user, req) {
  const accessToken = signAccessToken(user.userID);
  const { raw, hash } = generateRefreshToken();
  const created = await db.RefreshToken.create({
    userID: user.userID,
    tokenHash: hash,
    expiresAt: new Date(Date.now() + getRefreshExpiresMs()),
    ipAddress: req.ip,
    userAgent: req.get('User-Agent') || null,
  });
  return { accessToken, refreshTokenRaw: raw, refreshTokenID: created.tokenID };
}

async function login(req, res, next) {
  try {
    const { email, password } = req.validated.body;

    const user = await db.User.unscoped().findOne({ where: { email } });
    if (!user || user.isDeleted || !user.isActive) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (user.isLocked()) {
      throw new UnauthorizedError(
        `Account locked until ${user.lockedUntil.toISOString()}`,
      );
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      await user.registerFailedLogin();
      await logActivity({
        userID: user.userID,
        actionType: 'LOGIN_FAILED',
        label: 'Failed sign-in attempt',
        description: `Sign-in attempt failed (attempt ${user.failedLoginAttempts}).`,
        req,
      });
      // Account just locked — fire from the controller (Q2: we have req
      // here for IP context; cleaner than a model hook). isLocked() returns
      // true only when lockedUntil > now, which registerFailedLogin just set
      // on the threshold attempt.
      if (user.isLocked()) {
        notifyUser(user.userID, {
          type: 'ERROR',
          priority: 'CRITICAL',
          title: 'Account Locked',
          message: 'Your account has been temporarily locked due to multiple failed login attempts.',
          link: null,
          entityType: 'user',
          entityID: user.userID,
        }).catch((err) =>
          console.error('[notify] account-locked failed', { userID: user.userID, message: err.message }),
        );
      }
      throw new UnauthorizedError('Invalid credentials');
    }

    await user.registerSuccessfulLogin();
    await logActivity({
      userID: user.userID,
      actionType: 'LOGIN',
      label: 'Logged in',
      description: `Sign-in from ${req.ip || 'unknown IP'}.`,
      req,
    });

    const { accessToken, refreshTokenRaw } = await issueTokenPair(user, req);

    // Single source of truth: re-fetch with the SAME include shape as
    // /auth/me. password is excluded by the model's default scope. Hand-
    // curating the payload here previously dropped `isActive` (Profile
    // page rendered "Inactive" for clearly-active users until /me
    // refreshed the slice). Mirroring /me prevents that drift.
    const fresh = await fetchAuthUser(user.userID, user.role);

    return res.json({
      success: true,
      data: {
        accessToken,
        refreshToken: refreshTokenRaw,
        expiresIn: getAccessExpiresInSeconds(),
        user: fresh,
      },
    });
  } catch (err) {
    return next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken: raw } = req.validated.body;
    const tokenHash = hashRefreshToken(raw);

    const stored = await db.RefreshToken.findOne({ where: { tokenHash } });
    if (!stored) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    if (stored.revokedAt) {
      // Reuse detected — revoke entire chain for this user
      await db.RefreshToken.update(
        { revokedAt: new Date() },
        { where: { userID: stored.userID, revokedAt: null } },
      );
      throw new UnauthorizedError('Refresh token reuse detected. All sessions revoked.');
    }

    if (stored.expiresAt < new Date()) {
      throw new UnauthorizedError('Refresh token expired');
    }

    const user = await db.User.findByPk(stored.userID);
    if (!user || !user.isActive) {
      throw new UnauthorizedError('User not authorized');
    }

    const { accessToken, refreshTokenRaw, refreshTokenID } = await issueTokenPair(user, req);

    stored.revokedAt = new Date();
    stored.replacedByTokenID = refreshTokenID;
    await stored.save();

    return res.json({
      success: true,
      data: {
        accessToken,
        refreshToken: refreshTokenRaw,
        expiresIn: getAccessExpiresInSeconds(),
      },
    });
  } catch (err) {
    return next(err);
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken: raw } = req.validated.body;
    const tokenHash = hashRefreshToken(raw);

    await db.RefreshToken.update(
      { revokedAt: new Date() },
      {
        where: {
          tokenHash,
          userID: req.user.userID,
          revokedAt: null,
        },
      },
    );

    await logActivity({
      userID: req.user.userID,
      actionType: 'LOGOUT',
      label: 'Signed out',
      description: 'You signed out from this session.',
      req,
    });

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await fetchAuthUser(req.user.userID, req.user.role);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    return res.json({ success: true, data: user });
  } catch (err) {
    return next(err);
  }
}

/**
 * Single source of truth for the "auth user payload" shape used by both
 * `login` and `me`. password is excluded by the model's default scope.
 * Adding a new User field that should reach the SPA = update the model;
 * this helper picks it up automatically.
 */
async function fetchAuthUser(userID, role) {
  const include = [
    { model: db.Attachment, as: 'profilePhoto', required: false },
  ];
  if (role === 'CUSTOMER') {
    include.push({ model: db.Customer, as: 'customer' });
  }
  return db.User.findByPk(userID, { include });
}

async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.validated.body;

    const user = await db.User.unscoped().findByPk(req.user.userID);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    const ok = await user.comparePassword(currentPassword);
    if (!ok) {
      throw new UnauthorizedError('Current password incorrect');
    }

    user.password = newPassword;
    user.mustChangePassword = false;
    // Skip AuditLog: the PASSWORD_CHANGED UserActivity is the canonical
    // record. Leaving audit on would emit a row whose only meaningful
    // changed field is passwordChangedAt (password is excluded), which
    // duplicates the activity entry.
    await user.save({ skipAudit: true });

    await db.RefreshToken.update(
      { revokedAt: new Date() },
      { where: { userID: user.userID, revokedAt: null } },
    );

    await logActivity({
      userID: user.userID,
      actionType: 'PASSWORD_CHANGED',
      label: 'Password changed',
      description: 'Your account password was updated successfully.',
      req,
    });

    // Security-awareness notification. Self-initiated change → priority is
    // MEDIUM (informational, not alarming). If we ever surface "changed
    // from a new device", bump to HIGH.
    notifyUser(user.userID, {
      type: 'INFO',
      priority: 'MEDIUM',
      title: 'Password Changed',
      message: 'Your password was successfully updated.',
      link: '/profile',
      entityType: 'user',
      entityID: user.userID,
    }).catch((err) =>
      console.error('[notify] password-changed failed', { userID: user.userID, message: err.message }),
    );

    return res.json({
      success: true,
      message: 'Password changed. All sessions revoked. Please log in again.',
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { login, refresh, logout, me, changePassword };
