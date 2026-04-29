'use strict';

// Phase 3 verification: requireJwtAuth, requireRole, applyCustomerScope.
// Sets a test JWT_SECRET inline so this can run before .env has one.
// Run from backend/ with: node scripts/verify-phase3.js

process.env.JWT_SECRET = process.env.JWT_SECRET || 'phase3-test-secret-do-not-use-in-prod';

const jwt = require('jsonwebtoken');
const db = require('../src/models');
const requireJwtAuth = require('../src/middleware/requireJwtAuth');
const requireRole = require('../src/middleware/requireRole');
const applyCustomerScope = require('../src/middleware/applyCustomerScope');

const ADMIN_USER_ID = '55c88399-0cdd-4991-a385-b372e3b7098d';

function fakeReq({ token, user, authHeader } = {}) {
  return {
    user,
    header(name) {
      if (name === 'Authorization') {
        if (authHeader !== undefined) return authHeader;
        if (token) return `Bearer ${token}`;
      }
      return undefined;
    },
  };
}

function runMiddleware(mw, req) {
  return new Promise((resolve) => {
    mw(req, {}, (err) => resolve(err));
  });
}

(async () => {
  let exitCode = 0;
  const results = [];
  const expect = (label, ok, detail = '') => {
    results.push({ label, ok, detail });
    if (!ok) exitCode = 1;
  };

  try {
    await db.sequelize.authenticate();

    const validToken = jwt.sign(
      { sub: ADMIN_USER_ID },
      process.env.JWT_SECRET,
      { expiresIn: '15m' },
    );

    // ---------- requireJwtAuth ----------

    {
      const req = fakeReq();
      const err = await runMiddleware(requireJwtAuth, req);
      expect('requireJwtAuth: missing header → 401',
        err && err.statusCode === 401, err && err.message);
    }

    {
      const req = fakeReq({ authHeader: 'Token abc' });
      const err = await runMiddleware(requireJwtAuth, req);
      expect('requireJwtAuth: malformed header → 401',
        err && err.statusCode === 401, err && err.message);
    }

    {
      const req = fakeReq({ token: 'not-a-real-jwt' });
      const err = await runMiddleware(requireJwtAuth, req);
      expect('requireJwtAuth: bad signature → 401',
        err && err.statusCode === 401 && /invalid/i.test(err.message), err && err.message);
    }

    {
      const req = fakeReq({ token: validToken });
      const err = await runMiddleware(requireJwtAuth, req);
      expect('requireJwtAuth: valid token populates req.user',
        !err && req.user && req.user.role === 'ADMIN' && req.user.userID === ADMIN_USER_ID,
        err ? err.message : `req.user=${JSON.stringify(req.user)}`);
    }

    {
      const expiredToken = jwt.sign(
        { sub: ADMIN_USER_ID },
        process.env.JWT_SECRET,
        { expiresIn: '-1s' },
      );
      const req = fakeReq({ token: expiredToken });
      const err = await runMiddleware(requireJwtAuth, req);
      expect('requireJwtAuth: expired token → 401',
        err && err.statusCode === 401 && /expired/i.test(err.message), err && err.message);
    }

    {
      const adminUser = await db.User.unscoped().findByPk(ADMIN_USER_ID);
      const issuedBeforePwdChange = Math.floor(adminUser.passwordChangedAt.getTime() / 1000) - 60;
      const revokedToken = jwt.sign(
        { sub: ADMIN_USER_ID, iat: issuedBeforePwdChange },
        process.env.JWT_SECRET,
        { expiresIn: '15m', noTimestamp: true },
      );
      const req = fakeReq({ token: revokedToken });
      const err = await runMiddleware(requireJwtAuth, req);
      expect('requireJwtAuth: iat < passwordChangedAt → 401 revoked',
        err && err.statusCode === 401 && /revoked|password/i.test(err.message), err && err.message);
    }

    // ---------- requireRole ----------

    {
      const req = { user: { userID: ADMIN_USER_ID, role: 'ADMIN' } };
      const err = await runMiddleware(requireRole(['ADMIN', 'MANAGER']), req);
      expect('requireRole: ADMIN allowed for [ADMIN,MANAGER]', !err, err && err.message);
    }

    {
      const req = { user: { role: 'CUSTOMER' } };
      const err = await runMiddleware(requireRole('ADMIN'), req);
      expect('requireRole: CUSTOMER rejected for ADMIN → 403',
        err && err.statusCode === 403, err && err.message);
    }

    {
      const req = {};
      const err = await runMiddleware(requireRole('ADMIN'), req);
      expect('requireRole: no req.user → 401',
        err && err.statusCode === 401, err && err.message);
    }

    // ---------- applyCustomerScope ----------

    {
      const req = { user: { role: 'ADMIN' } };
      const err = await runMiddleware(applyCustomerScope, req);
      expect('applyCustomerScope: ADMIN → req.scope = {}',
        !err && JSON.stringify(req.scope) === '{}', err && err.message);
    }

    {
      const req = { user: { role: 'CUSTOMER', customerID: 'cust-uuid-1' } };
      const err = await runMiddleware(applyCustomerScope, req);
      expect('applyCustomerScope: CUSTOMER → req.scope = { customerID }',
        !err && req.scope.customerID === 'cust-uuid-1',
        err ? err.message : JSON.stringify(req.scope));
    }

    {
      const req = { user: { role: 'CUSTOMER', customerID: null } };
      const err = await runMiddleware(applyCustomerScope, req);
      expect('applyCustomerScope: CUSTOMER w/o customerID → 403',
        err && err.statusCode === 403, err && err.message);
    }

    // ---------- Results ----------

    console.log('\nResults');
    console.log('-------');
    for (const r of results) {
      const tag = r.ok ? 'PASS' : 'FAIL';
      console.log(`${tag}  ${r.label}${r.detail ? `  (${r.detail})` : ''}`);
    }
    console.log(`\n${exitCode === 0 ? 'ALL VERIFICATIONS PASSED' : 'VERIFICATION FAILED'}`);
  } catch (e) {
    console.error('ERROR:', e);
    exitCode = 1;
  } finally {
    await db.sequelize.close();
    process.exit(exitCode);
  }
})();
