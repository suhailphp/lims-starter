'use strict';

const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFound = require('./src/middleware/notFound');
const errorHandler = require('./src/middleware/errorHandler');
const requestContext = require('./src/middleware/requestContext');
const customerRoutes = require('./src/modules/customer/customer.routes');
const categoryRoutes = require('./src/modules/category/category.routes');
const { unitRouter } = require('./src/modules/unit/unit.routes');
const { testRouter } = require('./src/modules/test/test.routes');
const { methodRouter } = require('./src/modules/method/method.routes');
const specificationRoutes = require('./src/modules/specification/specification.routes');
const sourceTypeRoutes = require('./src/modules/sourceType/sourceType.routes');
const { sourceRouter } = require('./src/modules/source/source.routes');
const equipmentRoutes = require('./src/modules/equipment/equipment.routes');
const ocmElementRoutes = require('./src/modules/ocmElement/ocmElement.routes');
const authRoutes = require('./src/modules/auth/auth.routes');
const userRoutes = require('./src/modules/user/user.routes');
const attachmentRoutes = require('./src/modules/attachment/attachment.routes');
const { meRouter: userActivityMeRouter } = require('./src/modules/userActivity/userActivity.routes');
const auditLogRoutes = require('./src/modules/auditLog/auditLog.routes');
const notificationRoutes = require('./src/modules/notification/notification.routes');
const dashboardRoutes = require('./src/modules/dashboard/dashboard.routes');
const settingsRoutes = require('./src/modules/settings/settings.routes');
const currencyRoutes = require('./src/modules/currency/currency.routes');
const searchRoutes = require('./src/modules/search/search.routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use((req, _res, next) => {
  req.id = crypto.randomUUID();
  next();
});

// Establish request-scoped AsyncLocalStorage context BEFORE the route
// handlers run. Audit hooks (utils/auditableModel.js) and the activity
// logger read userId/ip/userAgent from this context. For unauth routes
// the context exists but `userId` is null — audit hooks bail on that.
//
// requireJwtAuth (mounted INSIDE each protected router) sets req.user
// before the controller runs. We re-set the ALS context after auth
// inside the requireJwtAuth chain so the userId is populated; for now
// this top-level mount captures ip/userAgent reliably for ALL requests.
app.use(requestContext);

app.get('/health', (_req, res) => {
  res.json({ success: true, status: 'ok' });
});

app.use('/api/customers', customerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/units', unitRouter);
app.use('/api/tests', testRouter);
app.use('/api/methods', methodRouter);
app.use('/api/specifications', specificationRoutes);
app.use('/api/source-types', sourceTypeRoutes);
app.use('/api/sources', sourceRouter);
app.use('/api/equipments', equipmentRoutes);
app.use('/api/ocm-elements', ocmElementRoutes);
app.use('/api/auth', authRoutes);
// /api/users/me/* must mount BEFORE /api/users so its more specific paths
// (activities, timeline) don't get swallowed by user.routes.js's `/:userID`
// match. The meRouter declares its own /activities and /timeline children.
app.use('/api/users/me', userActivityMeRouter);
app.use('/api/users', userRoutes);
app.use('/api/attachments', attachmentRoutes);
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/currencies', currencyRoutes);
app.use('/api/search', searchRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
