'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not configured');
  return secret;
}

function getAccessExpiresIn() {
  return process.env.JWT_ACCESS_EXPIRES || '15m';
}

function parseDuration(raw) {
  const m = /^(\d+)([smhd])$/.exec(raw);
  if (!m) throw new Error(`Invalid duration: ${raw}`);
  const n = parseInt(m[1], 10);
  const unit = m[2];
  const factor = unit === 's' ? 1000 : unit === 'm' ? 60000 : unit === 'h' ? 3600000 : 86400000;
  return n * factor;
}

function getAccessExpiresInSeconds() {
  return Math.floor(parseDuration(getAccessExpiresIn()) / 1000);
}

function getRefreshExpiresMs() {
  return parseDuration(process.env.JWT_REFRESH_EXPIRES || '7d');
}

function signAccessToken(userID) {
  return jwt.sign({ sub: userID }, getSecret(), { expiresIn: getAccessExpiresIn() });
}

function generateRefreshToken() {
  const raw = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(raw).digest('hex');
  return { raw, hash };
}

function hashRefreshToken(raw) {
  return crypto.createHash('sha256').update(raw).digest('hex');
}

module.exports = {
  signAccessToken,
  generateRefreshToken,
  hashRefreshToken,
  getRefreshExpiresMs,
  getAccessExpiresInSeconds,
};
