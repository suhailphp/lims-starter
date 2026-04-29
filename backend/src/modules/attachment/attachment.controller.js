'use strict';

const db = require('../../models');
const { AppError, NotFoundError } = require('../../utils/errors');

/**
 * POST /api/attachments
 * multipart/form-data — single file under field `file`.
 * Validation (size + MIME) is handled in `middleware/uploadImage.js`.
 *
 * Returns the created row including the VIRTUAL `dataUrl` so the client
 * can immediately render the image without a follow-up GET.
 */
async function create(req, res) {
  if (!req.file) {
    throw new AppError('No file provided. Use multipart field "file".', 422);
  }
  const { originalname, mimetype, size, buffer } = req.file;
  const fileData = buffer.toString('base64');

  const attachment = await db.Attachment.create(
    {
      fileName: originalname,
      mimeType: mimetype,
      fileSize: size,
      fileData,
    },
    { userId: req.user.userID },
  );

  res.status(201).json({
    success: true,
    message: 'Attachment uploaded successfully',
    data: attachment,
  });
}

/**
 * GET /api/attachments/:attachmentID
 * Single attachment incl. dataUrl. Most reads come via parent-entity
 * include (e.g. user.profilePhoto) — this is the direct fetch escape hatch.
 */
async function getOne(req, res) {
  const { attachmentID } = req.validated.params;
  const attachment = await db.Attachment.findByPk(attachmentID);
  if (!attachment) throw new NotFoundError('Attachment');
  res.json({ success: true, data: attachment });
}

/**
 * DELETE /api/attachments/:attachmentID
 * HARD delete (no soft-delete columns on this table). Caller is responsible
 * for clearing any FK pointers FIRST — this endpoint relies on the FK's
 * `ON DELETE SET NULL` (User.profilePhotoAttachmentID) to keep the parent
 * row consistent.
 */
async function destroy(req, res) {
  const { attachmentID } = req.validated.params;
  const deleted = await db.Attachment.destroy({ where: { attachmentID } });
  if (!deleted) throw new NotFoundError('Attachment');
  res.status(204).send();
}

module.exports = { create, getOne, destroy };
