'use strict';

const { Op } = require('sequelize');
const db = require('../../models');
const { NotFoundError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');
const { notify } = require('../../services/notificationService');

function buildCalibrationWhere(calibrationStatus) {
  const now = new Date();
  const soon = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  switch (calibrationStatus) {
    case 'UNKNOWN':
      return { calibrationDueDate: null };
    case 'OVERDUE':
      return { calibrationDueDate: { [Op.lt]: now } };
    case 'DUE_SOON':
      return { calibrationDueDate: { [Op.gte]: now, [Op.lte]: soon } };
    case 'VALID':
      return { calibrationDueDate: { [Op.gt]: soon } };
    default:
      return {};
  }
}

async function list(req, res) {
  const {
    page,
    limit,
    search,
    isActive,
    calibrationStatus,
    sort,
    order,
  } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const where = {};
  if (typeof isActive === 'boolean') where.isActive = isActive;
  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { serialNumber: { [Op.iLike]: `%${search}%` } },
    ];
  }
  if (calibrationStatus) {
    Object.assign(where, buildCalibrationWhere(calibrationStatus));
  }

  const { rows, count } = await db.Equipment.findAndCountAll({
    where,
    limit,
    offset,
    order: [[sort, order.toUpperCase()]],
  });

  res.json({
    success: true,
    data: rows,
    meta: buildMeta({ total: count, page, limit }),
  });
}

async function getOne(req, res) {
  const { equipmentID } = req.validated.params;
  const equipment = await db.Equipment.findByPk(equipmentID);
  if (!equipment) throw new NotFoundError('Equipment');
  res.json({ success: true, data: equipment });
}

async function create(req, res) {
  const equipment = await db.Equipment.create(req.validated.body, {
    userId: req.user.userID,
  });

  // Notify lab staff (TECHNICIAN/MANAGER/ADMIN). Customers excluded by
  // scope. The service drops the actor from the recipient set on its own
  // (triggeredBy → excludeUserID), so the admin who just created it
  // doesn't notify themselves. Fire-and-forget.
  notify({
    scope: 'LAB',
    roles: ['TECHNICIAN', 'MANAGER', 'ADMIN'],
    type: 'INFO',
    priority: 'LOW',
    title: 'New Equipment Added',
    message: `${equipment.name}${equipment.model ? ` (${equipment.model})` : ''} added to inventory`,
    link: '/equipment',
    entityType: 'equipment',
    entityID: equipment.equipmentID,
    triggeredBy: req.user.userID,
  }).catch((err) =>
    console.error('[notify] equipment-created failed', {
      equipmentID: equipment.equipmentID,
      message: err.message,
    }),
  );

  res.status(201).json({
    success: true,
    message: 'Equipment created successfully',
    data: equipment,
  });
}

async function update(req, res) {
  const { equipmentID } = req.validated.params;
  const equipment = await db.Equipment.findByPk(equipmentID);
  if (!equipment) throw new NotFoundError('Equipment');
  await equipment.auditedUpdate(req.validated.body, req.user.userID);
  res.json({
    success: true,
    message: 'Equipment updated successfully',
    data: equipment,
  });
}

async function softDelete(req, res) {
  const { equipmentID } = req.validated.params;
  const equipment = await db.Equipment.findByPk(equipmentID);
  if (!equipment) throw new NotFoundError('Equipment');

  // TODO: block delete when TestResult references this equipment (Module 5)

  await equipment.softDelete(req.user.userID);
  res.status(204).send();
}

module.exports = { list, getOne, create, update, softDelete };
