'use strict';

const { applyAuditHooks } = require('../utils/auditHooks');
const { applyAuditLogging } = require('../utils/auditableModel');

module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define(
    'Equipment',
    {
      equipmentID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      serialNumber: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      calibrationDueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      createdBy: { type: DataTypes.UUID, allowNull: true },
      updatedBy: { type: DataTypes.UUID, allowNull: true },
      deletedBy: { type: DataTypes.UUID, allowNull: true },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
      isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      // Computed field — not stored in DB. Switched from getterMethods (option-level)
      // to DataTypes.VIRTUAL (attribute-level) because Sequelize 6's toJSON does NOT
      // serialize getterMethods results — only VIRTUAL attributes are included in
      // res.json output. (Verified empirically 2026-04-27.)
      calibrationStatus: {
        type: DataTypes.VIRTUAL,
        get() {
          if (!this.calibrationDueDate) return 'UNKNOWN';
          const today = new Date();
          const dueDate = new Date(this.calibrationDueDate);
          const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
          if (daysUntilDue < 0) return 'OVERDUE';
          if (daysUntilDue <= 30) return 'DUE_SOON';
          return 'VALID';
        },
      },
    },
    {
      tableName: 'Equipments',
      timestamps: true,
      paranoid: false,
      defaultScope: {
        where: { isDeleted: false },
      },
      scopes: {
        includeDeleted: {},
        activeOnly: { where: { isDeleted: false, isActive: true } },
      },
    },
  );

  Equipment.associate = (models) => {
    // Future: Equipment.hasMany(models.TestResult, { foreignKey: 'equipmentID' });
  };

  applyAuditHooks(Equipment);
  applyAuditLogging(Equipment, 'equipment');
  return Equipment;
};
