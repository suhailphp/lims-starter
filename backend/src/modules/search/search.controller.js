'use strict';

const { search } = require('../../services/searchService');

async function globalSearch(req, res) {
  const { q, category } = req.validated.query;
  const data = await search({
    q,
    category,
    role: req.user.role,
  });
  res.json({ success: true, data });
}

module.exports = { globalSearch };
