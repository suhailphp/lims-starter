'use strict';

const db = require('../../models');
const { NotFoundError, AppError } = require('../../utils/errors');
const settingsService = require('../../services/settingsService');

/* ---------- read ---------- */

async function listAll(_req, res) {
  res.json({ success: true, data: settingsService.getAllSettings() });
}

async function listByCategory(req, res) {
  const { category } = req.validated.params;
  res.json({
    success: true,
    data: settingsService.getSettingsByCategory(category),
  });
}

async function listPublic(_req, res) {
  /* Expand IMAGE-type public settings with the attachment's dataUrl so
   * the unauth /login page can render the logo without an authed
   * Attachment fetch. We resolve only the public IMAGE rows — anything
   * else passes through unchanged. */
  const rows = settingsService.getPublicSettings();
  const imageRows = rows.filter((r) => r.valueType === 'IMAGE' && r.value);
  if (imageRows.length === 0) {
    return res.json({ success: true, data: rows });
  }
  const ids = imageRows.map((r) => r.value);
  const attachments = await db.Attachment.findAll({
    where: { attachmentID: ids },
    attributes: ['attachmentID', 'mimeType', 'fileData', 'dataUrl'],
  });
  const map = new Map(attachments.map((a) => [a.attachmentID, a.toJSON()]));
  const enriched = rows.map((r) => {
    if (r.valueType !== 'IMAGE' || !r.value) return r;
    const a = map.get(r.value);
    return {
      ...r,
      attachment: a
        ? { attachmentID: a.attachmentID, mimeType: a.mimeType, dataUrl: a.dataUrl }
        : null,
    };
  });
  res.json({ success: true, data: enriched });
}

async function getOne(req, res) {
  const { settingKey } = req.validated.params;
  const row = settingsService.getSettingRow(settingKey);
  if (!row) throw new NotFoundError('Setting');
  res.json({ success: true, data: row });
}

/* ---------- write ---------- */

async function update(req, res) {
  const { settingKey } = req.validated.params;
  const { value } = req.validated.body;
  const row = await settingsService.updateSetting(
    settingKey,
    value === undefined ? null : value,
    req.user.userID,
  );
  res.json({
    success: true,
    message: 'Setting updated successfully',
    data: row,
  });
}

async function bulkUpdate(req, res) {
  const updated = await settingsService.bulkUpdate(
    req.validated.body,
    req.user.userID,
  );
  res.json({
    success: true,
    message: `Updated ${updated.length} setting${updated.length === 1 ? '' : 's'}`,
    data: updated,
  });
}

/**
 * POST /api/settings/lab-logo
 * multipart/form-data — single image under field `file`.
 *
 * Two-step transactional flow:
 *   1. Insert the new Attachment.
 *   2. Read the previous lab_logo_attachment_id (if any) for hard-delete.
 *   3. Update the setting to the new attachment ID.
 *   4. Hard-delete the previous attachment row.
 *
 * Mirrors the user profile-photo pattern (Attachment hard-delete on
 * replace inside one transaction). The Attachment table holds raw bytes
 * — leaving an orphan is wasteful, so we reclaim aggressively.
 */
async function uploadLogo(req, res) {
  if (!req.file) {
    throw new AppError('No file provided. Use multipart field "file".', 422);
  }

  const { originalname, mimetype, size, buffer } = req.file;
  const fileData = buffer.toString('base64');

  /* Soft size check against the live setting (multer's hard cap is the
   * absolute ceiling). Logos are usually small but the setting may be
   * tighter than the multer cap. */
  const cap = settingsService.getSetting('max_attachment_size_kb', 500);
  if (size > cap * 1024) {
    throw new AppError(`File too large. Max ${cap} KB per current settings.`, 422);
  }

  const result = await db.sequelize.transaction(async (t) => {
    const attachment = await db.Attachment.create(
      {
        fileName: originalname,
        mimeType: mimetype,
        fileSize: size,
        fileData,
      },
      { userId: req.user.userID, transaction: t },
    );

    const prev = await db.Setting.findOne({
      where: { settingKey: 'lab_logo_attachment_id' },
      transaction: t,
    });
    if (!prev) {
      throw new AppError('lab_logo_attachment_id setting is missing — re-run the seed.', 500);
    }
    const previousID = prev.value;

    await prev.update(
      { value: attachment.attachmentID, updatedBy: req.user.userID },
      { transaction: t },
    );

    if (previousID) {
      await db.Attachment.destroy({
        where: { attachmentID: previousID },
        transaction: t,
      });
    }

    return attachment;
  });

  await settingsService.refreshCache();

  res.status(201).json({
    success: true,
    message: 'Lab logo uploaded successfully',
    data: result,
  });
}

module.exports = {
  listAll,
  listByCategory,
  listPublic,
  getOne,
  update,
  bulkUpdate,
  uploadLogo,
};
