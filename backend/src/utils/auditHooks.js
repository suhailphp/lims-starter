'use strict';

function applyAuditHooks(Model) {
  Model.addHook('beforeCreate', (instance, options) => {
    if (options && options.userId) {
      if (!instance.createdBy) instance.createdBy = options.userId;
      instance.updatedBy = options.userId;
    }
  });

  Model.addHook('beforeUpdate', (instance, options) => {
    if (options && options.userId) {
      instance.updatedBy = options.userId;
    }
  });

  Model.prototype.softDelete = function softDelete(userId, options = {}) {
    return this.update(
      {
        isDeleted: true,
        deletedBy: userId,
        deletedAt: new Date(),
      },
      { ...options, userId },
    );
  };

  /* User-initiated save — always bump updatedAt, even when payload values
   * exactly match current DB values.
   *
   * Two Sequelize quirks force this dance:
   *   1. instance.update() skips the UPDATE entirely if no payload field is
   *      dirty — leaves updatedAt frozen at createdAt.
   *   2. instance.set('updatedAt', new Date()) is silently ignored —
   *      Sequelize protects managed timestamps from manual set().
   * The working primitive is `changed('updatedAt', true)`: marks the
   * field dirty, save() then runs UPDATE and Sequelize auto-bumps the
   * value itself.
   *
   * For an audit-heavy LIMS, "last time someone hit Save" is the intended
   * semantic — recorded explicitly. Use this in PUT controllers. */
  Model.prototype.auditedUpdate = function auditedUpdate(payload, userId, options = {}) {
    this.set(payload);
    this.changed('updatedAt', true);
    return this.save({ ...options, userId });
  };
}

module.exports = { applyAuditHooks };
