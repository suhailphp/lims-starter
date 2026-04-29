'use strict';

// Phase 6 verification: JWT cutover for master-data routes + customer scope.
// Run from backend/ with: node scripts/verify-phase6.js
//
// Prereqs:
//   - Phase 4 admin user exists (admin@lims.local / Admin123)
//   - JWT_SECRET in .env
//   - All migrations applied

require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const db = require('../src/models');

const ADMIN_EMAIL = 'admin@lims.local';
const ADMIN_PASSWORD = 'Admin123';

const CUSTOMER_A_NAME = 'Phase6 Customer A';
const CUSTOMER_B_NAME = 'Phase6 Customer B';
const CUSTOMER_USER_EMAIL = 'phase6-cust@test.local';
const CUSTOMER_USER_PASSWORD = 'CustPass1';
const SOURCE_TYPE_NAME = 'Phase6 SourceType';
const CATEGORY_NAME = 'Phase6 Category';

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

  await db.User.destroy({ where: { email: CUSTOMER_USER_EMAIL }, force: true });
  await db.RefreshToken.update(
    { revokedAt: new Date() },
    { where: { userID: admin.userID, revokedAt: null } },
  );

  // Hard-delete fixture rows so re-runs are idempotent.
  // Source has FKs to Customer/Category/SourceType, so delete it first.
  const oldCustomers = await db.Customer.unscoped().findAll({
    where: { name: [CUSTOMER_A_NAME, CUSTOMER_B_NAME] },
  });
  for (const c of oldCustomers) {
    await db.Source.unscoped().destroy({ where: { customerID: c.customerID }, force: true });
    await db.User.unscoped().destroy({ where: { customerID: c.customerID }, force: true });
  }
  await db.Customer.unscoped().destroy({
    where: { name: [CUSTOMER_A_NAME, CUSTOMER_B_NAME] },
    force: true,
  });
  await db.Category.unscoped().destroy({ where: { name: CATEGORY_NAME }, force: true });
  await db.SourceType.unscoped().destroy({ where: { name: SOURCE_TYPE_NAME }, force: true });

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

  // ── JWT cutover (master-data routes) ──────────────────────────────────────

  // 1. Missing Authorization → 401
  {
    const res = await request(app).get('/api/categories');
    expect('jwt: missing Authorization → 401',
      res.status === 401, `status=${res.status}`);
  }

  // 2. Stub auth header alone (X-User-ID without Bearer) → 401
  {
    const res = await request(app).get('/api/categories')
      .set('X-User-ID', admin.userID);
    expect('jwt: X-User-ID stub header alone → 401 (stub is dead)',
      res.status === 401, `status=${res.status}`);
  }

  // 3. Invalid bearer token → 401
  {
    const res = await request(app).get('/api/categories')
      .set('Authorization', 'Bearer not-a-real-token');
    expect('jwt: invalid Bearer token → 401',
      res.status === 401, `status=${res.status}`);
  }

  // 4. Valid Bearer (admin) → 200 on /api/categories
  {
    const res = await request(app).get('/api/categories')
      .set('Authorization', `Bearer ${adminToken}`);
    expect('jwt: valid admin Bearer on /api/categories → 200',
      res.status === 200, `status=${res.status}`);
  }

  // 5. Valid Bearer (admin) → 200 on /api/equipments
  {
    const res = await request(app).get('/api/equipments')
      .set('Authorization', `Bearer ${adminToken}`);
    expect('jwt: valid admin Bearer on /api/equipments → 200',
      res.status === 200, `status=${res.status}`);
  }

  // 6. Valid Bearer (admin) → 200 on /api/source-types
  {
    const res = await request(app).get('/api/source-types')
      .set('Authorization', `Bearer ${adminToken}`);
    expect('jwt: valid admin Bearer on /api/source-types → 200',
      res.status === 200, `status=${res.status}`);
  }

  // ── Setup fixture data via the API (admin) ────────────────────────────────

  let customerAID;
  let customerBID;
  let sourceTypeID;
  let categoryID;
  let customerAUserID;
  let sourceAID;
  let sourceBID;

  {
    const a = await request(app).post('/api/customers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: CUSTOMER_A_NAME, paymentTermsDays: 30 });
    customerAID = a.body.data?.customerID;
    const b = await request(app).post('/api/customers')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: CUSTOMER_B_NAME, paymentTermsDays: 30 });
    customerBID = b.body.data?.customerID;
    expect('setup: admin created Customer A and B',
      a.status === 201 && b.status === 201 && customerAID && customerBID,
      `a=${a.status} b=${b.status}`);
  }

  {
    const st = await request(app).post('/api/source-types')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: SOURCE_TYPE_NAME, label: 'P6ST' });
    sourceTypeID = st.body.data?.sourceTypeID;
    const cat = await request(app).post('/api/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: CATEGORY_NAME, type: 'FUEL' });
    categoryID = cat.body.data?.categoryID;
    if (!sourceTypeID || !categoryID) {
      throw new Error(`setup failed: sourceType=${st.status} category=${cat.status}`);
    }
  }

  {
    const u = await request(app).post('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        firstName: 'Phase6',
        lastName: 'Cust',
        email: CUSTOMER_USER_EMAIL,
        password: CUSTOMER_USER_PASSWORD,
        role: 'CUSTOMER',
        customerID: customerAID,
      });
    customerAUserID = u.body.data?.userID;
    if (!customerAUserID) {
      throw new Error(`setup user create failed: ${u.status} ${JSON.stringify(u.body)}`);
    }
    // Clear mustChangePassword so the customer can log in normally.
    await db.User.update({ mustChangePassword: false }, { where: { userID: customerAUserID } });
  }

  // 7. Admin creates source under Customer A
  {
    const res = await request(app).post(`/api/customers/${customerAID}/sources`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        sourceTypeID, categoryID,
        sourceName: 'A-Source',
      });
    sourceAID = res.body.data?.sourceID;
    expect('source: admin POST /api/customers/:A/sources → 201',
      res.status === 201 && !!sourceAID, `status=${res.status}`);
  }

  // Admin creates source under Customer B too (no expect — fixture)
  {
    const res = await request(app).post(`/api/customers/${customerBID}/sources`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ sourceTypeID, categoryID, sourceName: 'B-Source' });
    sourceBID = res.body.data?.sourceID;
    if (!sourceBID) {
      throw new Error(`fixture source for B failed: ${res.status} ${JSON.stringify(res.body)}`);
    }
  }

  // Login as the CUSTOMER user
  const custSession = await loginAs(CUSTOMER_USER_EMAIL, CUSTOMER_USER_PASSWORD);
  const custToken = custSession.accessToken;

  // ── Customer scope ────────────────────────────────────────────────────────

  // 8. ADMIN list customers → both A and B visible
  {
    const res = await request(app).get('/api/customers?limit=100')
      .set('Authorization', `Bearer ${adminToken}`);
    const ids = (res.body.data || []).map((c) => c.customerID);
    expect('scope: ADMIN list /api/customers includes both A and B',
      res.status === 200 && ids.includes(customerAID) && ids.includes(customerBID),
      `status=${res.status} count=${ids.length}`);
  }

  // 9. CUSTOMER list customers → only own (A)
  {
    const res = await request(app).get('/api/customers?limit=100')
      .set('Authorization', `Bearer ${custToken}`);
    const ids = (res.body.data || []).map((c) => c.customerID);
    expect('scope: CUSTOMER list /api/customers returns only own customer',
      res.status === 200 && ids.length === 1 && ids[0] === customerAID,
      `status=${res.status} ids=${ids.join(',')}`);
  }

  // 10. CUSTOMER getOne own → 200
  {
    const res = await request(app).get(`/api/customers/${customerAID}`)
      .set('Authorization', `Bearer ${custToken}`);
    expect('scope: CUSTOMER GET /api/customers/:ownID → 200',
      res.status === 200, `status=${res.status}`);
  }

  // 11. CUSTOMER getOne other → 403
  {
    const res = await request(app).get(`/api/customers/${customerBID}`)
      .set('Authorization', `Bearer ${custToken}`);
    expect('scope: CUSTOMER GET /api/customers/:otherID → 403',
      res.status === 403, `status=${res.status}`);
  }

  // 12. CUSTOMER cannot create customers
  {
    const res = await request(app).post('/api/customers')
      .set('Authorization', `Bearer ${custToken}`)
      .send({ name: 'Should Fail', paymentTermsDays: 30 });
    expect('scope: CUSTOMER POST /api/customers → 403',
      res.status === 403, `status=${res.status}`);
  }

  // 13. CUSTOMER cannot update other customer
  {
    const res = await request(app).put(`/api/customers/${customerBID}`)
      .set('Authorization', `Bearer ${custToken}`)
      .send({ name: 'Hacked', paymentTermsDays: 30 });
    expect('scope: CUSTOMER PUT /api/customers/:otherID → 403',
      res.status === 403, `status=${res.status}`);
  }

  // 14. CUSTOMER cannot delete other customer
  {
    const res = await request(app).delete(`/api/customers/${customerBID}`)
      .set('Authorization', `Bearer ${custToken}`);
    expect('scope: CUSTOMER DELETE /api/customers/:otherID → 403',
      res.status === 403, `status=${res.status}`);
  }

  // ── Source scope ──────────────────────────────────────────────────────────

  // 15. CUSTOMER list sources under own customer → 200, only own sources
  {
    const res = await request(app).get(`/api/customers/${customerAID}/sources?limit=100`)
      .set('Authorization', `Bearer ${custToken}`);
    const ids = (res.body.data || []).map((s) => s.sourceID);
    expect('scope: CUSTOMER list /api/customers/:ownID/sources → only own',
      res.status === 200 && ids.includes(sourceAID) && !ids.includes(sourceBID),
      `status=${res.status} ids=${ids.join(',')}`);
  }

  // 16. CUSTOMER list sources under another customer → 403
  {
    const res = await request(app).get(`/api/customers/${customerBID}/sources`)
      .set('Authorization', `Bearer ${custToken}`);
    expect('scope: CUSTOMER list /api/customers/:otherID/sources → 403',
      res.status === 403, `status=${res.status}`);
  }

  // 17. CUSTOMER POST source under another customer → 403
  {
    const res = await request(app).post(`/api/customers/${customerBID}/sources`)
      .set('Authorization', `Bearer ${custToken}`)
      .send({ sourceTypeID, categoryID, sourceName: 'Hijack' });
    expect('scope: CUSTOMER POST /api/customers/:otherID/sources → 403',
      res.status === 403, `status=${res.status}`);
  }

  // 18. CUSTOMER GET own source → 200
  {
    const res = await request(app).get(`/api/sources/${sourceAID}`)
      .set('Authorization', `Bearer ${custToken}`);
    expect('scope: CUSTOMER GET /api/sources/:ownSourceID → 200',
      res.status === 200, `status=${res.status}`);
  }

  // 19. CUSTOMER GET other-customer source → 403
  {
    const res = await request(app).get(`/api/sources/${sourceBID}`)
      .set('Authorization', `Bearer ${custToken}`);
    expect('scope: CUSTOMER GET /api/sources/:otherSourceID → 403',
      res.status === 403, `status=${res.status}`);
  }

  // 20. CUSTOMER PUT other-customer source → 403
  {
    const res = await request(app).put(`/api/sources/${sourceBID}`)
      .set('Authorization', `Bearer ${custToken}`)
      .send({
        sourceTypeID, categoryID,
        sourceName: 'Hacked', isActive: true,
      });
    expect('scope: CUSTOMER PUT /api/sources/:otherSourceID → 403',
      res.status === 403, `status=${res.status}`);
  }

  // ── Cleanup ───────────────────────────────────────────────────────────────
  await db.Source.unscoped().destroy({ where: { sourceID: [sourceAID, sourceBID] }, force: true });
  await db.User.unscoped().destroy({ where: { userID: customerAUserID }, force: true });
  await db.Customer.unscoped().destroy({
    where: { customerID: [customerAID, customerBID] }, force: true,
  });
  await db.Category.unscoped().destroy({ where: { categoryID }, force: true });
  await db.SourceType.unscoped().destroy({ where: { sourceTypeID }, force: true });
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
