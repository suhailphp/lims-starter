'use strict';

const { getAdminStats } = require('./dashboard.service');

async function adminStats(_req, res) {
  const data = await getAdminStats();
  res.json({ success: true, data });
}

module.exports = { adminStats };
