'use strict';

class AppError extends Error {
  constructor(message, statusCode, errors) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    if (errors) this.errors = errors;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

class ConflictError extends AppError {
  constructor(message, errors) {
    super(message, 409, errors);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

module.exports = { AppError, NotFoundError, ConflictError, UnauthorizedError, ForbiddenError };
