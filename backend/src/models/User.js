'use strict';

const bcrypt = require('bcrypt');
const { applyAuditHooks } = require('../utils/auditHooks');
const { applyAuditLogging } = require('../utils/auditableModel');
const settingsService = require('../services/settingsService');

const BCRYPT_COST = 12;
/* Hardcoded fallbacks. The live values come from the `system` category
 * via settingsService.getSetting(); these only kick in when the cache
 * is cold (boot crash before initSettingsCache resolved). */
const FALLBACK_MAX_FAILED_ATTEMPTS = 5;
const FALLBACK_LOCKOUT_MINUTES = 30;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'RECEPTIONIST', 'TECHNICIAN', 'MANAGER', 'CUSTOMER'),
      allowNull: false,
    },
    customerID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    profilePhotoAttachmentID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    failedLoginAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lockedUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    mustChangePassword: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    deletedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'Users',
    timestamps: true,
    paranoid: false,
    // Login queries must use User.unscoped() to retrieve the password hash.
    defaultScope: {
      where: { isDeleted: false },
      attributes: { exclude: ['password'] },
    },
    scopes: {
      includeDeleted: {},
    },
  });

  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, BCRYPT_COST);
      user.passwordChangedAt = new Date();
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, BCRYPT_COST);
      user.passwordChangedAt = new Date();
    }
  });

  User.prototype.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.password);
  };

  User.prototype.isLocked = function () {
    return this.lockedUntil != null && this.lockedUntil > new Date();
  };

  User.prototype.registerFailedLogin = async function () {
    this.failedLoginAttempts = (this.failedLoginAttempts || 0) + 1;
    const maxAttempts = settingsService.getSetting(
      'max_login_attempts',
      FALLBACK_MAX_FAILED_ATTEMPTS,
    );
    const lockoutMinutes = settingsService.getSetting(
      'account_lockout_minutes',
      FALLBACK_LOCKOUT_MINUTES,
    );
    if (this.failedLoginAttempts >= maxAttempts) {
      this.lockedUntil = new Date(Date.now() + lockoutMinutes * 60 * 1000);
    }
    // System-internal lock counter — not a user-initiated edit. The
    // LOGIN_FAILED UserActivity is the canonical record for this event.
    await this.save({ skipAudit: true });
  };

  User.prototype.registerSuccessfulLogin = async function () {
    this.failedLoginAttempts = 0;
    this.lockedUntil = null;
    this.lastLoginAt = new Date();
    // System-internal lastLoginAt bump — not a user-initiated edit. The
    // LOGIN UserActivity is the canonical record for this event.
    await this.save({ skipAudit: true });
  };

  User.associate = (models) => {
    User.belongsTo(models.Customer, {
      foreignKey: 'customerID',
      as: 'customer',
    });
    User.belongsTo(models.Attachment, {
      foreignKey: 'profilePhotoAttachmentID',
      as: 'profilePhoto',
    });
    User.hasMany(models.RefreshToken, {
      foreignKey: 'userID',
      as: 'refreshTokens',
    });
    User.hasMany(models.UserActivity, {
      foreignKey: 'userID',
      as: 'activities',
    });
  };

  applyAuditHooks(User);
  // Password is bcrypt-hashed; still NEVER include any version of it in
  // audit JSON. CRITICAL — leaking a hash via audit history would be a
  // security incident.
  applyAuditLogging(User, 'user', { excludeFields: ['password'] });

  return User;
};
