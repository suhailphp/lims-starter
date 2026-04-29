'use strict';

const { Op, fn, col, literal } = require('sequelize');
const db = require('../../models');

/* ---------- helpers ---------- */

function startOfUTCDay(d) {
  const x = new Date(d);
  x.setUTCHours(0, 0, 0, 0);
  return x;
}

function isoDate(d) {
  return startOfUTCDay(d).toISOString().slice(0, 10); // YYYY-MM-DD
}

/**
 * Fill 7 contiguous days ending today (UTC). Each input row is
 * `{ day: 'YYYY-MM-DD', count: <int> }`. Days with no rows show 0 so
 * the line chart renders a continuous series.
 */
function fillDailySeries(days, rows) {
  const map = new Map(rows.map((r) => [r.day, Number(r.count)]));
  const out = [];
  const today = startOfUTCDay(new Date());
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const key = isoDate(d);
    out.push({ date: key, count: map.get(key) ?? 0 });
  }
  return out;
}

/* ---------- core aggregator ---------- */

async function getAdminStats() {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const startOfToday = startOfUTCDay(now);
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  /* All counts run in parallel. defaultScope on every model already
   * filters isDeleted=false. We don't filter isActive here — the
   * dashboard counts the universe of records, not just active ones. */
  const [
    customers,
    tests,
    equipment,
    users,
    methods,
    categories,
    sources,
    sourceTypes,
    units,
    specifications,
    ocmElements,
    auditDailyRaw,
    activityDailyRaw,
    overdueRows,
    dueSoonRows,
    auditRecentRaw,
    activityRecentRaw,
    equipmentActiveValid,
    equipmentActiveDueSoon,
    equipmentActiveOverdue,
    equipmentActiveUnknown,
    equipmentInactive,
    activitiesTodayCount,
    activeUsers24hRows,
    pendingCalibrationsCount,
    recentLoginsTodayCount,
  ] = await Promise.all([
    db.Customer.count(),
    db.Test.count(),
    db.Equipment.count(),
    db.User.count(),
    db.Method.count(),
    db.Category.count(),
    db.Source.count(),
    db.SourceType.count(),
    db.Unit.count(),
    db.Specification.count(),
    db.OcmElement.count(),

    /* AuditLog daily count — last 7 days. PostgreSQL date_trunc returns
     * a timestamp; cast to date for stable string keys. */
    db.AuditLog.findAll({
      attributes: [
        [fn('to_char', fn('date_trunc', 'day', col('createdAt')), 'YYYY-MM-DD'), 'day'],
        [fn('COUNT', col('auditLogID')), 'count'],
      ],
      where: { createdAt: { [Op.gte]: sevenDaysAgo } },
      group: [literal('day')],
      raw: true,
    }),

    /* UserActivity daily count — auth events ONLY (LOGIN/LOGOUT/LOGIN_FAILED).
     * PROFILE_UPDATED / PHOTO_UPDATED / PASSWORD_CHANGED / PASSWORD_RESET are
     * deduped — each has a corresponding AuditLog entry on User, so counting
     * both would double-count the same business event. */
    db.UserActivity.findAll({
      attributes: [
        [fn('to_char', fn('date_trunc', 'day', col('createdAt')), 'YYYY-MM-DD'), 'day'],
        [fn('COUNT', col('activityID')), 'count'],
      ],
      where: {
        createdAt: { [Op.gte]: sevenDaysAgo },
        actionType: { [Op.in]: ['LOGIN', 'LOGOUT', 'LOGIN_FAILED'] },
      },
      group: [literal('day')],
      raw: true,
    }),

    /* Equipment alerts — overdue calibration. calibrationStatus is a
     * VIRTUAL field, so we filter on the underlying calibrationDueDate. */
    db.Equipment.findAll({
      where: {
        isActive: true,
        calibrationDueDate: { [Op.lt]: now },
      },
      order: [['calibrationDueDate', 'ASC']],
      limit: 5,
    }),
    db.Equipment.findAll({
      where: {
        isActive: true,
        calibrationDueDate: {
          [Op.gte]: now,
          [Op.lte]: fourteenDaysFromNow,
        },
      },
      order: [['calibrationDueDate', 'ASC']],
      limit: 5,
    }),

    /* Recent activity — pull more than we need from each side and merge.
     * Same dedupe rule as the chart: only auth-event UAs (the rest are
     * mirrored in AuditLog).
     *
     * AuditLog has NO `belongsTo(User)` association (intentional — audit
     * must survive user purge, so userID has no FK). We fetch users in a
     * second query below, keyed on the userIDs we collected. */
    db.AuditLog.findAll({
      order: [['createdAt', 'DESC']],
      limit: 20,
      raw: false,
    }),
    db.UserActivity.findAll({
      where: {
        actionType: { [Op.in]: ['LOGIN', 'LOGOUT', 'LOGIN_FAILED'] },
      },
      order: [['createdAt', 'DESC']],
      limit: 20,
      include: [
        {
          model: db.User,
          as: 'user',
          required: false,
          attributes: ['userID', 'firstName', 'lastName', 'role', 'profilePhotoAttachmentID'],
          include: [
            {
              model: db.Attachment,
              as: 'profilePhoto',
              required: false,
              attributes: ['attachmentID', 'mimeType', 'fileData', 'dataUrl'],
            },
          ],
        },
      ],
    }),

    /* ---------- Equipment status buckets (active + inactive) ----------
     * Mirrors the VIRTUAL `calibrationStatus` getter on Equipment.js:
     *   no due date → UNKNOWN; <today → OVERDUE; ≤30d → DUE_SOON; else VALID.
     * Inactive equipment is counted separately regardless of due date. */
    db.Equipment.count({
      where: {
        isActive: true,
        calibrationDueDate: { [Op.gt]: thirtyDaysFromNow },
      },
    }),
    db.Equipment.count({
      where: {
        isActive: true,
        calibrationDueDate: { [Op.gte]: now, [Op.lte]: thirtyDaysFromNow },
      },
    }),
    db.Equipment.count({
      where: {
        isActive: true,
        calibrationDueDate: { [Op.lt]: now },
      },
    }),
    db.Equipment.count({
      where: { isActive: true, calibrationDueDate: null },
    }),
    db.Equipment.count({ where: { isActive: false } }),

    /* ---------- Quick stats ---------- */

    /* Activities today — every AuditLog row since startOfToday. */
    db.AuditLog.count({ where: { createdAt: { [Op.gte]: startOfToday } } }),

    /* Active users in last 24h — distinct userID with a LOGIN
     * UserActivity. Returned as rows (Sequelize doesn't expose
     * `count(distinct)` cleanly without raw). */
    db.UserActivity.findAll({
      attributes: [[fn('DISTINCT', col('userID')), 'userID']],
      where: {
        actionType: 'LOGIN',
        createdAt: { [Op.gte]: twentyFourHoursAgo },
      },
      raw: true,
    }),

    /* Pending calibrations — overdue + due-soon together. The visual
     * intent is "things needing attention", not just one bucket. */
    db.Equipment.count({
      where: {
        isActive: true,
        calibrationDueDate: { [Op.lte]: thirtyDaysFromNow },
      },
    }),

    /* Recent logins today — total LOGIN events since startOfToday. */
    db.UserActivity.count({
      where: {
        actionType: 'LOGIN',
        createdAt: { [Op.gte]: startOfToday },
      },
    }),
  ]);

  /* Manually attach actor info for AuditLog rows (no FK on userID). */
  const auditUserIDs = [...new Set(auditRecentRaw.map((r) => r.userID).filter(Boolean))];
  const auditUserMap = new Map();
  if (auditUserIDs.length) {
    const users = await db.User.findAll({
      where: { userID: { [Op.in]: auditUserIDs } },
      attributes: ['userID', 'firstName', 'lastName', 'role', 'profilePhotoAttachmentID'],
      include: [
        {
          model: db.Attachment,
          as: 'profilePhoto',
          required: false,
          attributes: ['attachmentID', 'mimeType', 'fileData', 'dataUrl'],
        },
      ],
    });
    users.forEach((u) => auditUserMap.set(u.userID, u.toJSON()));
  }

  const auditDaily = fillDailySeries(7, auditDailyRaw);
  const activityDaily = fillDailySeries(7, activityDailyRaw);
  const activityLast7Days = auditDaily.map((d, i) => ({
    date: d.date,
    count: d.count + activityDaily[i].count,
  }));

  const masterData =
    customers +
    tests +
    equipment +
    methods +
    sources +
    ocmElements +
    categories +
    sourceTypes +
    units +
    specifications;

  /* Distribution donut: top 6 substantive entities. Ordering preserved
   * so the legend reads in the same sequence the slices render. */
  const masterDataDistribution = [
    { label: 'Customers', count: customers, color: '#6366f1' },
    { label: 'Tests', count: tests, color: '#10b981' },
    { label: 'Methods', count: methods, color: '#f59e0b' },
    { label: 'Equipment', count: equipment, color: '#06b6d4' },
    { label: 'Sources', count: sources, color: '#ec4899' },
    { label: 'OCM Elements', count: ocmElements, color: '#8b5cf6' },
  ];
  const distributionTotal = masterDataDistribution.reduce(
    (s, slice) => s + slice.count,
    0,
  );

  const auditRecent = auditRecentRaw.map((row) => {
    const a = row.toJSON();
    return {
      source: 'audit_log',
      id: a.auditLogID,
      createdAt: a.createdAt,
      action: a.action,
      entityType: a.entityType,
      entityID: a.entityID,
      actor: auditUserMap.get(a.userID) || null,
    };
  });
  const activityRecent = activityRecentRaw.map((row) => {
    const a = row.toJSON();
    return {
      source: 'user_activity',
      id: a.activityID,
      createdAt: a.createdAt,
      actionType: a.actionType,
      actionLabel: a.actionLabel,
      actor: a.user || null,
    };
  });
  const recentActivity = [...auditRecent, ...activityRecent]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  const equipmentStatusTotal =
    equipmentActiveValid +
    equipmentActiveDueSoon +
    equipmentActiveOverdue +
    equipmentActiveUnknown +
    equipmentInactive;

  const equipmentStatus = {
    valid: equipmentActiveValid,
    dueSoon: equipmentActiveDueSoon,
    overdue: equipmentActiveOverdue,
    unknown: equipmentActiveUnknown,
    inactive: equipmentInactive,
    total: equipmentStatusTotal,
  };

  const quickStats = {
    activitiesToday: activitiesTodayCount,
    activeUsers24h: activeUsers24hRows.length,
    pendingCalibrations: pendingCalibrationsCount,
    recentLoginsToday: recentLoginsTodayCount,
  };

  return {
    metrics: {
      customers,
      tests,
      equipment,
      users,
      methods,
      categories,
      sources,
      sourceTypes,
      units,
      specifications,
      ocmElements,
      masterData,
    },
    charts: {
      activityLast7Days,
      masterDataDistribution,
      distributionTotal,
    },
    equipmentAlerts: {
      overdue: overdueRows.map((e) => ({
        equipmentID: e.equipmentID,
        name: e.name,
        model: e.model,
        serialNumber: e.serialNumber,
        calibrationDueDate: e.calibrationDueDate,
        calibrationStatus: e.calibrationStatus,
      })),
      dueSoon: dueSoonRows.map((e) => ({
        equipmentID: e.equipmentID,
        name: e.name,
        model: e.model,
        serialNumber: e.serialNumber,
        calibrationDueDate: e.calibrationDueDate,
        calibrationStatus: e.calibrationStatus,
      })),
    },
    equipmentStatus,
    quickStats,
    recentActivity,
    generatedAt: now.toISOString(),
  };
}

module.exports = { getAdminStats };
