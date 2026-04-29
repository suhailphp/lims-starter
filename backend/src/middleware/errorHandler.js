'use strict';

const { ZodError } = require('zod');
const { Sequelize } = require('sequelize');
const { AppError } = require('../utils/errors');

function formatZodIssues(err) {
  return err.issues.map((issue) => ({
    field: issue.path.join('.') || '(root)',
    message: issue.message,
  }));
}

function formatSequelizeErrors(err) {
  return err.errors.map((e) => ({
    field: e.path,
    message: e.message,
  }));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  const isProd = process.env.NODE_ENV === 'production';

  if (err instanceof ZodError) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: formatZodIssues(err),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors ? { errors: err.errors } : {}),
    });
  }

  if (err instanceof Sequelize.UniqueConstraintError) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate value violates unique constraint',
      errors: formatSequelizeErrors(err),
    });
  }

  if (err instanceof Sequelize.ValidationError) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: formatSequelizeErrors(err),
    });
  }

  if (err instanceof Sequelize.ForeignKeyConstraintError) {
    return res.status(409).json({
      success: false,
      message: 'Related record constraint violation',
    });
  }

  console.error('[500]', { requestId: req.id, error: err });
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    requestId: req.id,
    ...(isProd ? {} : { debug: { message: err.message, stack: err.stack } }),
  });
}

module.exports = errorHandler;
