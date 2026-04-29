'use strict';

// Phase 5 verification: User CRUD endpoints (admin + self-service).
// Run from backend/ with: node scripts/verify-phase5.js
//
// Prereqs:
//   - Phase 4 admin user exists (admin@lims.local / Admin123)
//   - JWT_SECRET in .env
//   - migrations through 20260426000003 applied

require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const db = require('../src/models');

const ADMIN_EMAIL = 'admin@lims.local';
const ADMIN_PASSWORD = 'Admin123';
const TEMP_USER_EMAIL = 'phase5-temp@test.local';
const INITIAL_TEMP_PASSWORD = 'Temp1234';

const results = [];
let exitCode = 0;
const expect = (label, ok, detail = '') => {
  results.push({ label, ok, detail });
  if (!ok) exitCode = 1;
};

async function ensureClean() {
  const admin = await db.User.unscoped().findOne({ where: { email: ADMIN_EMAIL } });
  admin.password = ADMIN_PASSWORD;
  admin.failedLoginAttempts = 0;
  admin.lockedUntil = null;
  admin.mustChangePassword = false;
  await admin.save();
  await db.User.destroy({ where: { email: TEMP_USER_EMAIL } });
  await db.RefreshToken.update(
    { revokedAt: new Date() },
    { where: { userID: admin.userID, revokedAt: null } },
  );
  return admin;
}

async function loginAs(email, password) {
  const res = await request(app).post('/api/auth/login').send({ email, password });
  if (res.status !== 200) {
    throw new Error(`login as ${email} failed: ${res.status} ${JSON.stringify(res.body)}`);
  }
  return res.body.data;
}

async function run() {
  const admin = await ensureClean();
  const adminSession = await loginAs(ADMIN_EMAIL, ADMIN_PASSWORD);
  const adminToken = adminSession.accessToken;

  // 1. Create user (admin)
  let tempUserID;
  {
    const res = await request(app).post('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        firstName: 'Phase5',
        lastName: 'Temp',
        email: TEMP_USER_EMAIL,
        password: INITIAL_TEMP_PASSWORD,
        role: 'TECHNICIAN',
      });
    expect('create: admin creates user → 201',
      res.status === 201 && res.body.data?.email === TEMP_USER_EMAIL,
      `status=${res.status}`);
    expect('create: mustChangePassword = true on creation',
      res.body.data?.mustChangePassword === true,
      `mcp=${res.body.data?.mustChangePassword}`);
    expect('create: response excludes password',
      res.body.data && !('password' in res.body.data),
      '');
    expect('create: createdBy = admin (audit hook)',
      res.body.data?.createdBy === admin.userID,
      `createdBy=${res.body.data?.createdBy}`);
    tempUserID = res.body.data.userID;
  }

  // 2. Create — CUSTOMER without customerID → 422
  {
    const res = await request(app).post('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        firstName: 'Bad', lastName: 'Customer',
        email: 'bad-customer@test.local',
        password: 'Test1234',
        role: 'CUSTOMER',
      });
    expect('create: CUSTOMER without customerID → 422',
      res.status === 422, `status=${res.status}`);
  }

  // 3. Create — non-CUSTOMER with customerID → 422
  {
    const res = await request(app).post('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        firstName: 'Bad', lastName: 'Tech',
        email: 'bad-tech@test.local',
        password: 'Test1234',
        role: 'TECHNICIAN',
        customerID: '00000000-0000-4000-8000-000000000000',
      });
    expect('create: non-CUSTOMER with customerID → 422',
      res.status === 422, `status=${res.status}`);
  }

  // 4. List users (admin)
  {
    const res = await request(app).get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect('list: admin → 200',
      res.status === 200, `status=${res.status}`);
    expect('list: includes new temp user',
      Array.isArray(res.body.data) && res.body.data.some((u) => u.userID === tempUserID),
      '');
    expect('list: meta has total/page/limit/totalPages',
      res.body.meta
      && ['total', 'page', 'limit', 'totalPages'].every((k) => k in res.body.meta),
      '');
  }

  // 5. GET specific user (admin)
  {
    const res = await request(app).get(`/api/users/${tempUserID}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect('getOne: admin → 200',
      res.status === 200 && res.body.data?.userID === tempUserID,
      `status=${res.status}`);
  }

  // 6. Temp user logs in → mustChangePassword=true in user payload
  let tempSession;
  {
    tempSession = await loginAs(TEMP_USER_EMAIL, INITIAL_TEMP_PASSWORD);
    expect('login: temp user response has mustChangePassword=true',
      tempSession.user?.mustChangePassword === true,
      `mcp=${tempSession.user?.mustChangePassword}`);
  }

  // 7. Self-update: firstName allowed
  {
    const res = await request(app).put(`/api/users/${tempUserID}`)
      .set('Authorization', `Bearer ${tempSession.accessToken}`)
      .send({ firstName: 'Renamed' });
    expect('update: self updates firstName → 200',
      res.status === 200 && res.body.data?.firstName === 'Renamed',
      `status=${res.status}`);
  }

  // 8. Self-update: role forbidden
  {
    const res = await request(app).put(`/api/users/${tempUserID}`)
      .set('Authorization', `Bearer ${tempSession.accessToken}`)
      .send({ role: 'ADMIN' });
    expect('update: self updates role → 403',
      res.status === 403, `status=${res.status}`);
  }

  // 9. Self-update: email forbidden (Q3)
  {
    const res = await request(app).put(`/api/users/${tempUserID}`)
      .set('Authorization', `Bearer ${tempSession.accessToken}`)
      .send({ email: 'hijacked@test.local' });
    expect('update: self updates email → 403 (Q3)',
      res.status === 403, `status=${res.status}`);
  }

  // 10. Self deletes self → 403
  {
    const res = await request(app).delete(`/api/users/${tempUserID}`)
      .set('Authorization', `Bearer ${tempSession.accessToken}`);
    expect('delete: non-admin → 403 (requireRole)',
      res.status === 403, `status=${res.status}`);
  }

  // 11. Temp user views other (admin) → 403
  {
    const res = await request(app).get(`/api/users/${admin.userID}`)
      .set('Authorization', `Bearer ${tempSession.accessToken}`);
    expect('getOne: non-staff viewing other user → 403',
      res.status === 403, `status=${res.status}`);
  }

  // 12. Temp user views self → 200
  {
    const res = await request(app).get(`/api/users/${tempUserID}`)
      .set('Authorization', `Bearer ${tempSession.accessToken}`);
    expect('getOne: self → 200',
      res.status === 200 && res.body.data?.userID === tempUserID,
      `status=${res.status}`);
  }

  // 13. Temp user lists users → 403
  {
    const res = await request(app).get('/api/users')
      .set('Authorization', `Bearer ${tempSession.accessToken}`);
    expect('list: TECHNICIAN → 403',
      res.status === 403, `status=${res.status}`);
  }

  // 14. Change-password (self) clears mustChangePassword
  const NEW_USER_PASSWORD = 'NewPass123';
  {
    const res = await request(app).post('/api/auth/change-password')
      .set('Authorization', `Bearer ${tempSession.accessToken}`)
      .send({ currentPassword: INITIAL_TEMP_PASSWORD, newPassword: NEW_USER_PASSWORD });
    expect('change-password: self → 200',
      res.status === 200, `status=${res.status}`);

    const fresh = await db.User.unscoped().findByPk(tempUserID);
    expect('change-password: mustChangePassword cleared',
      fresh.mustChangePassword === false,
      `mcp=${fresh.mustChangePassword}`);
  }

  // 15. New login → mustChangePassword=false
  {
    const ses = await loginAs(TEMP_USER_EMAIL, NEW_USER_PASSWORD);
    expect('login: after self change → mustChangePassword=false',
      ses.user?.mustChangePassword === false,
      `mcp=${ses.user?.mustChangePassword}`);
    tempSession = ses;
  }

  // 16. Reset-password (admin, server-generated)
  let serverGeneratedTemp;
  {
    const res = await request(app).post(`/api/users/${tempUserID}/reset-password`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({});
    expect('reset-password: admin (server-generated) → 200',
      res.status === 200, `status=${res.status}`);
    expect('reset-password: returns tempPassword in response',
      typeof res.body.data?.tempPassword === 'string'
      && res.body.data.tempPassword.length === 12,
      `len=${res.body.data?.tempPassword?.length}`);
    expect('reset-password: mustChangePassword=true again',
      res.body.data?.mustChangePassword === true, '');
    serverGeneratedTemp = res.body.data.tempPassword;

    // user's old refresh token should be revoked
    const refr = tempSession.refreshToken;
    const refrAfter = await request(app).post('/api/auth/refresh').send({ refreshToken: refr });
    expect('reset-password: old refresh tokens revoked',
      refrAfter.status === 401, `status=${refrAfter.status}`);
  }

  // 17. Login with server-generated temp password
  {
    const ses = await loginAs(TEMP_USER_EMAIL, serverGeneratedTemp);
    expect('login: with server-generated temp → 200 + mustChangePassword=true',
      ses.user?.mustChangePassword === true,
      `mcp=${ses.user?.mustChangePassword}`);
  }

  // 18. Reset-password (admin, admin-typed password)
  {
    const ADMIN_TYPED = 'AdminTyped9';
    const res = await request(app).post(`/api/users/${tempUserID}/reset-password`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ newPassword: ADMIN_TYPED });
    expect('reset-password: admin-typed → 200',
      res.status === 200 && res.body.data?.tempPassword === ADMIN_TYPED,
      `status=${res.status}`);

    const ses = await loginAs(TEMP_USER_EMAIL, ADMIN_TYPED);
    expect('reset-password: admin-typed accepted on login',
      !!ses.accessToken, '');
  }

  // 19. Reset-password (admin, weak password) → 422
  {
    const res = await request(app).post(`/api/users/${tempUserID}/reset-password`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ newPassword: 'short' });
    expect('reset-password: weak admin-typed → 422',
      res.status === 422, `status=${res.status}`);
  }

  // 20. Admin updates user role (with valid customerID transitions)
  {
    const res = await request(app).put(`/api/users/${tempUserID}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'MANAGER', isActive: true });
    expect('update: admin updates role → 200',
      res.status === 200 && res.body.data?.role === 'MANAGER',
      `status=${res.status}`);
    expect('update: updatedBy = admin (audit)',
      res.body.data?.updatedBy === admin.userID,
      `updatedBy=${res.body.data?.updatedBy}`);
  }

  // 21. Admin: try to change role to CUSTOMER without customerID → 422
  {
    const res = await request(app).put(`/api/users/${tempUserID}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'CUSTOMER' });
    expect('update: admin role=CUSTOMER w/o customerID → 422',
      res.status === 422, `status=${res.status}`);
  }

  // 22. Admin tries to delete self → 403
  {
    const res = await request(app).delete(`/api/users/${admin.userID}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect('delete: admin deletes self → 403',
      res.status === 403, `status=${res.status}`);
  }

  // 23. Admin soft-deletes temp user
  {
    const res = await request(app).delete(`/api/users/${tempUserID}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect('delete: admin soft-deletes user → 204',
      res.status === 204, `status=${res.status}`);

    const dbRow = await db.User.unscoped().findByPk(tempUserID);
    expect('delete: isDeleted=true, deletedBy=admin, deletedAt set',
      dbRow.isDeleted === true && dbRow.deletedBy === admin.userID && dbRow.deletedAt != null,
      `flags=${dbRow.isDeleted},${dbRow.deletedBy}`);
  }

  // 24. Default scope hides deleted user
  {
    const found = await db.User.findByPk(tempUserID);
    expect('delete: default scope hides deleted user',
      found === null, `found=${!!found}`);
  }

  // 25. Cleanup: hard-delete temp user
  await db.User.destroy({ where: { email: TEMP_USER_EMAIL } });
}

(async () => {
  try {
    await db.sequelize.authenticate();
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing from .env');
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
