'use strict';

// One-off verification script for Phase 2 (User model password hashing + scopes).
// Run from backend/ with: node scripts/verify-phase2.js

const db = require('../src/models');
const { User } = db;

const TEST_USER_ID = '55c88399-0cdd-4991-a385-b372e3b7098d';
const NEW_PASSWORD = 'Admin123';

(async () => {
  let exitCode = 0;
  try {
    await db.sequelize.authenticate();
    console.log('--- Connection ---');
    console.log('DB:', db.sequelize.config.database, '@', db.sequelize.config.host);

    console.log('\n--- 1. Load existing user (unscoped to see password) ---');
    const before = await User.unscoped().findByPk(TEST_USER_ID);
    if (!before) throw new Error(`Test user ${TEST_USER_ID} not found`);
    console.log('email:                ', before.email);
    console.log('password (before):    ', String(before.password).slice(0, 30) + '...');
    console.log('passwordChangedAt:    ', before.passwordChangedAt);
    console.log('failedLoginAttempts:  ', before.failedLoginAttempts);

    console.log('\n--- 2. Update password via instance .save() to trigger beforeUpdate hook ---');
    before.password = NEW_PASSWORD;
    await before.save();
    console.log('save() complete');

    console.log('\n--- 3. Re-load and verify hash format ---');
    const after = await User.unscoped().findByPk(TEST_USER_ID);
    console.log('password (after):     ', after.password);
    const hashOk = after.password.startsWith('$2b$12$');
    console.log('starts with $2b$12$:  ', hashOk);
    console.log('passwordChangedAt set:', after.passwordChangedAt instanceof Date);
    if (!hashOk) { console.error('FAIL: hash format wrong'); exitCode = 1; }

    console.log('\n--- 4. comparePassword ---');
    const matchCorrect = await after.comparePassword(NEW_PASSWORD);
    const matchWrong = await after.comparePassword('Wrong9999');
    console.log('comparePassword("Admin123"):  ', matchCorrect);
    console.log('comparePassword("Wrong9999"): ', matchWrong);
    if (!matchCorrect || matchWrong) { console.error('FAIL: comparePassword'); exitCode = 1; }

    console.log('\n--- 5. Default scope excludes password ---');
    const scoped = await User.findByPk(TEST_USER_ID);
    const scopedJSON = scoped.toJSON();
    console.log('password key in toJSON():', 'password' in scopedJSON ? 'LEAKED' : 'EXCLUDED');
    console.log('email still present:     ', scopedJSON.email);
    if ('password' in scopedJSON) { console.error('FAIL: password leaked via default scope'); exitCode = 1; }

    console.log('\n--- 6. unscoped() returns password ---');
    const unscoped = await User.unscoped().findByPk(TEST_USER_ID);
    const unscopedHasPwd = typeof unscoped.password === 'string' && unscoped.password.length > 0;
    console.log('unscoped password loaded:', unscopedHasPwd);
    if (!unscopedHasPwd) { console.error('FAIL: unscoped did not return password'); exitCode = 1; }

    console.log('\n=========================================');
    console.log(exitCode === 0 ? 'ALL VERIFICATIONS PASSED' : 'VERIFICATION FAILED');
    console.log('=========================================');
  } catch (e) {
    console.error('ERROR:', e.message);
    console.error(e.stack);
    exitCode = 1;
  } finally {
    await db.sequelize.close();
    process.exit(exitCode);
  }
})();
