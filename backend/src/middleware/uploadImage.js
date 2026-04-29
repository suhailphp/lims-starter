'use strict';

const multer = require('multer');
const { AppError } = require('../utils/errors');
const settingsService = require('../services/settingsService');

/* Hard ceiling — multer's filter runs at parse time so we can't reflect
 * the live setting here. Set a generous absolute cap; the real limit is
 * the `max_attachment_size_kb` setting, enforced post-multer below. */
const HARD_CAP_BYTES = 5 * 1024 * 1024; // 5 MB
const FALLBACK_KB = 500;
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp']);

/**
 * Memory-storage multer for image uploads. Use on a route that expects a
 * single field named `file`:
 *
 *   router.post('/', uploadImage.single('file'), validate({...}), controller.create);
 *
 * The controller reads the buffer from `req.file.buffer` and base64-encodes
 * it before persisting.
 *
 * Errors are re-shaped into `AppError` so the standard errorHandler renders
 * them as JSON instead of multer's HTML default.
 */
const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: HARD_CAP_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED.has(file.mimetype)) {
      cb(new AppError(
        `Unsupported file type: ${file.mimetype}. Allowed: image/jpeg, image/png, image/webp.`,
        422,
      ));
      return;
    }
    cb(null, true);
  },
});

/**
 * Wraps `uploadImage.single(field)` to:
 *   1. convert multer's MulterError into our AppError envelope, and
 *   2. enforce the LIVE `max_attachment_size_kb` setting against the
 *      parsed file size, so admins can tighten/loosen the cap without
 *      a redeploy. Hardcoded fallback applies if the cache is cold.
 */
function single(field) {
  const middleware = uploadImage.single(field);
  return (req, res, next) => {
    middleware(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new AppError(
            `File too large. Hard cap is ${Math.floor(HARD_CAP_BYTES / 1024)} KB.`,
            422,
          ));
        }
        return next(err);
      }
      if (req.file) {
        const capKb = settingsService.getSetting('max_attachment_size_kb', FALLBACK_KB);
        if (req.file.size > capKb * 1024) {
          return next(new AppError(
            `File too large. Max ${capKb} KB per current settings.`,
            422,
          ));
        }
      }
      return next();
    });
  };
}

module.exports = { uploadImage, single, HARD_CAP_BYTES, ALLOWED_MIME_TYPES: [...ALLOWED] };
