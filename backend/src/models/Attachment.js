'use strict';

const { applyAuditLogging } = require('../utils/auditableModel');

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Attachment is FILE STORAGE, not a business record:
 *   - No soft-delete columns.
 *   - No applyAuditHooks() (which would add softDelete/auditedUpdate prototype
 *     methods we deliberately don't want callers reaching for).
 *   - Two manual audit hooks set createdBy/updatedBy from `options.userId`,
 *     matching the rest of the project's pattern.
 *
 * Replace semantics: when an entity (e.g. User) flips its FK to point at a
 * new attachment, the controller HARD-DELETES the old row in the same
 * transaction. Audit trail of "what changed" lives on the parent entity's
 * `updatedAt`/`updatedBy` (auditedUpdate), not on the attachment table.
 *
 * See docs/decisions/ADR-attachments-storage-strategy.md.
 */
module.exports = (sequelize, DataTypes) => {
  const Attachment = sequelize.define(
    'Attachment',
    {
      attachmentID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fileName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      mimeType: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { isIn: [ALLOWED_MIME_TYPES] },
      },
      fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fileData: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      // Convenience VIRTUAL — Sequelize 6 toJSON() serializes VIRTUAL but
      // not getterMethods (verified empirically for Equipment.calibrationStatus).
      dataUrl: {
        type: DataTypes.VIRTUAL,
        get() {
          if (!this.fileData || !this.mimeType) return null;
          return `data:${this.mimeType};base64,${this.fileData}`;
        },
      },
    },
    {
      tableName: 'Attachments',
      timestamps: true,
      paranoid: false,
    },
  );

  // Audit hooks — populate createdBy/updatedBy from options.userId. Lifted
  // from utils/auditHooks.js but inlined so no soft-delete prototype methods
  // get attached to this model.
  Attachment.addHook('beforeCreate', (instance, options) => {
    if (options && options.userId) {
      if (!instance.createdBy) instance.createdBy = options.userId;
      instance.updatedBy = options.userId;
    }
  });
  Attachment.addHook('beforeUpdate', (instance, options) => {
    if (options && options.userId) {
      instance.updatedBy = options.userId;
    }
  });

  // fileData is base64 — including it would bloat audit rows by ~700KB
  // each and leak image bytes into a forensic table. dataUrl is virtual
  // and won't appear anyway, but exclude defensively.
  applyAuditLogging(Attachment, 'attachment', { excludeFields: ['fileData', 'dataUrl'] });

  return Attachment;
};

module.exports.ALLOWED_MIME_TYPES = ALLOWED_MIME_TYPES;
