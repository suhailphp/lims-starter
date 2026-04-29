'use strict';

require('dotenv').config();

const app = require('./app');
const db = require('./src/models');
const { initSettingsCache } = require('./src/services/settingsService');

const PORT = process.env.PORT || 3033;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log(`DB connected: ${process.env.DB_DATABASE}`);
    /* Settings cache must initialize BEFORE we accept requests — auth
     * lockout reads max_login_attempts on every login attempt. A cold
     * cache would force fallback to hardcoded defaults until a write
     * triggered a refresh. */
    await initSettingsCache();
    console.log('Settings cache initialized');
    app.listen(PORT, () => {
      console.log(`LIMS API listening on http://localhost:${PORT}`);
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Stub auth active — every request must send X-User-ID header');
      }
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
