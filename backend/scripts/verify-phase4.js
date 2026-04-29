'use strict';

// Phase 4 verification: auth endpoints (login/refresh/logout/me/change-password).
// Uses supertest against the live Express app and a real database connection.
// Run from backend/ with: node scripts/verify-phase4.js
//
// Prereqs:
//   - migrations applied
//   - JWT_SECRET present in .env
//   - admin user (admin@lims.local) exists with password "Admin123"
//     (set by Phase 2 verify; this script restores it on exit if changed)

require('dotenv').config();

const request = require('supertest');
const crypto = require('crypto');
const app = require('../app');
const db = require('../src/models');

const ADMIN_EMAIL = 'admin@lims.local';
const ADMIN_PASSWORD = 'Admin123';
const TEMP_LOCKOUT_EMAIL = 'temp-lockout-phase4@test.local';

const results = [];
let exitCode = 0;
const expect = (label, ok, detail = '') => {
  results.push({ label, ok, detail });
  if (!ok) exitCode = 1;
};

async function ensureCleanState() {
  // Reset admin password and counters to known state.
  const admin = await db.User.unscoped().findOne({ where: { email: ADMIN_EMAIL } });
  if (!admin) throw new Error(`Admin user ${ADMIN_EMAIL} not found`);
  admin.password = ADMIN_PASSWORD;
  admin.failedLoginAttempts = 0;
  admin.lockedUntil = null;
  await admin.save();
  // Hard-delete any leftover temp user from previous failed runs.
  await db.User.destroy({ where: { email: TEMP_LOCKOUT_EMAIL } });
  // Revoke all admin refresh tokens to start clean.
  await db.RefreshToken.update(
    { revokedAt: new Date() },
    { where: { userID: admin.userID, revokedAt: null } },
  );
  return admin;
}

async function run() {
  console.log('--- Setup ---');
  const admin = await ensureCleanState();
  console.log(`Admin reset: ${admin.email} (${admin.userID})`);

  // 1. Login with bad password
  {
    const res = await request(app).post('/api/auth/login').send({
      email: ADMIN_EMAIL,
      password: 'WrongPassword99',
    });
    expect('login: bad password → 401',
      res.status === 401 && res.body.success === false,
      `status=${res.status} msg=${res.body.message}`);

    const fresh = await db.User.unscoped().findByPk(admin.userID);
    expect('login: bad password increments failedLoginAttempts',
      fresh.failedLoginAttempts === 1,
      `attempts=${fresh.failedLoginAttempts}`);
  }

  // Reset counter so subsequent tests don't trigger lockout
  await db.User.update(
    { failedLoginAttempts: 0, lockedUntil: null },
    { where: { userID: admin.userID } },
  );

  // 2. Login correct
  let accessToken; let refreshToken;
  {
    const res = await request(app).post('/api/auth/login').send({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    expect('login: correct creds → 200',
      res.status === 200 && res.body.success === true,
      `status=${res.status}`);
    expect('login: returns accessToken + refreshToken + user',
      typeof res.body.data?.accessToken === 'string'
      && typeof res.body.data?.refreshToken === 'string'
      && res.body.data?.user?.email === ADMIN_EMAIL,
      '');
    expect('login: response excludes password',
      res.body.data?.user && !('password' in res.body.data.user),
      '');
    accessToken = res.body.data.accessToken;
    refreshToken = res.body.data.refreshToken;
  }

  // 3. /me with access token
  {
    const res = await request(app).get('/api/auth/me')
      .set('Authorization', `Bearer ${accessToken}`);
    expect('/me: with token → 200 + profile',
      res.status === 200 && res.body.data?.email === ADMIN_EMAIL,
      `status=${res.status}`);
    expect('/me: response excludes password',
      res.body.data && !('password' in res.body.data),
      '');
  }

  // 4. /me without token
  {
    const res = await request(app).get('/api/auth/me');
    expect('/me: no token → 401',
      res.status === 401, `status=${res.status}`);
  }

  // 5. Refresh — happy path
  let newAccessToken; let newRefreshToken;
  {
    const res = await request(app).post('/api/auth/refresh').send({ refreshToken });
    expect('refresh: valid → 200 + new pair',
      res.status === 200
      && typeof res.body.data?.accessToken === 'string'
      && typeof res.body.data?.refreshToken === 'string'
      && res.body.data?.refreshToken !== refreshToken,
      `status=${res.status}`);
    expect('refresh: returns no user payload (Q4)',
      !('user' in (res.body.data || {})),
      Object.keys(res.body.data || {}).join(','));
    newAccessToken = res.body.data.accessToken;
    newRefreshToken = res.body.data.refreshToken;

    const oldHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const oldRow = await db.RefreshToken.findOne({ where: { tokenHash: oldHash } });
    expect('refresh: old token marked revoked + replacedByTokenID',
      oldRow.revokedAt != null && oldRow.replacedByTokenID != null,
      `revokedAt=${oldRow.revokedAt} replaced=${oldRow.replacedByTokenID}`);
  }

  // 6. Refresh with the now-revoked old token → reuse detected
  {
    const res = await request(app).post('/api/auth/refresh').send({ refreshToken });
    expect('refresh: reuse of revoked token → 401',
      res.status === 401 && /reuse/i.test(res.body.message || ''),
      res.body.message);

    // Verify chain revoked: the new token we got at step 5 should now also be revoked
    const newHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex');
    const newRow = await db.RefreshToken.findOne({ where: { tokenHash: newHash } });
    expect('refresh: reuse alarm revoked entire chain',
      newRow.revokedAt != null,
      `newRow.revokedAt=${newRow.revokedAt}`);
  }

  // 7. Expired refresh token
  {
    const expiredRaw = crypto.randomBytes(32).toString('hex');
    const expiredHash = crypto.createHash('sha256').update(expiredRaw).digest('hex');
    await db.RefreshToken.create({
      userID: admin.userID,
      tokenHash: expiredHash,
      expiresAt: new Date(Date.now() - 1000),
    });
    const res = await request(app).post('/api/auth/refresh').send({ refreshToken: expiredRaw });
    expect('refresh: expired token → 401',
      res.status === 401 && /expired/i.test(res.body.message || ''),
      res.body.message);
  }

  // 8. Logout flow
  {
    // Fresh login to get a clean session
    const loginRes = await request(app).post('/api/auth/login').send({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    const tok = loginRes.body.data.accessToken;
    const refr = loginRes.body.data.refreshToken;

    const logoutRes = await request(app).post('/api/auth/logout')
      .set('Authorization', `Bearer ${tok}`)
      .send({ refreshToken: refr });
    expect('logout: → 204', logoutRes.status === 204, `status=${logoutRes.status}`);

    const refreshAfter = await request(app).post('/api/auth/refresh').send({ refreshToken: refr });
    expect('refresh after logout → 401',
      refreshAfter.status === 401, `status=${refreshAfter.status}`);
  }

  // 9. Lockout (uses temp user)
  {
    await db.User.create({
      firstName: 'Temp',
      lastName: 'Lockout',
      email: TEMP_LOCKOUT_EMAIL,
      password: 'Test1234',
      role: 'TECHNICIAN',
    });

    let lastRes;
    for (let i = 0; i < 5; i += 1) {
      lastRes = await request(app).post('/api/auth/login').send({
        email: TEMP_LOCKOUT_EMAIL,
        password: 'WrongWrong99',
      });
    }
    expect('lockout: 5th bad attempt also returns 401',
      lastRes.status === 401, `status=${lastRes.status}`);

    const tempUser = await db.User.unscoped().findOne({ where: { email: TEMP_LOCKOUT_EMAIL } });
    expect('lockout: failedLoginAttempts === 5',
      tempUser.failedLoginAttempts === 5,
      `attempts=${tempUser.failedLoginAttempts}`);
    expect('lockout: lockedUntil set in future',
      tempUser.lockedUntil != null && tempUser.lockedUntil > new Date(),
      `lockedUntil=${tempUser.lockedUntil}`);

    // 6th attempt — even with correct password — should now report locked + timestamp
    const lockedRes = await request(app).post('/api/auth/login').send({
      email: TEMP_LOCKOUT_EMAIL,
      password: 'Test1234',
    });
    expect('lockout: locked account → 401 with timestamp (Q5)',
      lockedRes.status === 401
      && /Account locked until/i.test(lockedRes.body.message || ''),
      lockedRes.body.message);

    // Cleanup
    await db.User.destroy({ where: { email: TEMP_LOCKOUT_EMAIL } });
  }

  // 10. Change password flow
  {
    // Login fresh
    const loginRes = await request(app).post('/api/auth/login').send({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    const tok = loginRes.body.data.accessToken;
    const refr = loginRes.body.data.refreshToken;

    const newPwd = 'NewAdmin456';

    // wrong currentPassword → 401
    const wrongCurrent = await request(app).post('/api/auth/change-password')
      .set('Authorization', `Bearer ${tok}`)
      .send({ currentPassword: 'wrong-current', newPassword: newPwd });
    expect('change-password: wrong current → 401',
      wrongCurrent.status === 401, `status=${wrongCurrent.status}`);

    // weak new password → 422
    const weakNew = await request(app).post('/api/auth/change-password')
      .set('Authorization', `Bearer ${tok}`)
      .send({ currentPassword: ADMIN_PASSWORD, newPassword: 'short' });
    expect('change-password: weak newPassword → 422',
      weakNew.status === 422, `status=${weakNew.status}`);

    // happy path
    const ok = await request(app).post('/api/auth/change-password')
      .set('Authorization', `Bearer ${tok}`)
      .send({ currentPassword: ADMIN_PASSWORD, newPassword: newPwd });
    expect('change-password: success → 200',
      ok.status === 200, `status=${ok.status}`);

    // refresh token should now be revoked
    const refrAfter = await request(app).post('/api/auth/refresh').send({ refreshToken: refr });
    expect('change-password: old refresh tokens bulk-revoked',
      refrAfter.status === 401, `status=${refrAfter.status}`);

    // old password no longer works
    const oldPwdLogin = await request(app).post('/api/auth/login').send({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    expect('change-password: old password rejected',
      oldPwdLogin.status === 401, `status=${oldPwdLogin.status}`);

    // new password works
    const newPwdLogin = await request(app).post('/api/auth/login').send({
      email: ADMIN_EMAIL,
      password: newPwd,
    });
    expect('change-password: new password accepted',
      newPwdLogin.status === 200, `status=${newPwdLogin.status}`);

    // Restore admin password to Admin123 for future runs
    const adminFresh = await db.User.unscoped().findByPk(admin.userID);
    adminFresh.password = ADMIN_PASSWORD;
    adminFresh.failedLoginAttempts = 0;
    adminFresh.lockedUntil = null;
    await adminFresh.save();
    await db.RefreshToken.update(
      { revokedAt: new Date() },
      { where: { userID: admin.userID, revokedAt: null } },
    );
  }
}

(async () => {
  try {
    await db.sequelize.authenticate();
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET missing from .env — cannot run Phase 4 verification');
    }
    await run();

    console.log('\nResults');
    console.log('-------');
    for (const r of results) {
      const tag = r.ok ? 'PASS' : 'FAIL';
      console.log(`${tag}  ${r.label}${r.detail ? `  (${r.detail})` : ''}`);
    }
    console.log(`\n${exitCode === 0 ? 'ALL VERIFICATIONS PASSED' : 'VERIFICATION FAILED'}`);
  } catch (e) {
    console.error('FATAL:', e);
    exitCode = 1;
  } finally {
    await db.sequelize.close();
    process.exit(exitCode);
  }
})();
