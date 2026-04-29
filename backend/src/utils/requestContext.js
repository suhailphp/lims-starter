'use strict';

/**
 * AsyncLocalStorage wrapper for request-scoped context (userID, IP, UA).
 *
 * Why ALS instead of threading `options.userId` everywhere:
 *   - Sequelize model hooks fire deep inside the call chain. Forcing every
 *     caller to pass IP/UA into options would require touching every
 *     `Model.create` / `instance.update` site in the codebase, and missing
 *     ONE silently drops the audit row.
 *   - ALS is Node's built-in primitive for this exact use case. Set once
 *     by middleware at request entry, read anywhere downstream — including
 *     async hooks, services, helpers — without parameter threading.
 *
 * Empty store fallback: outside of a request (CLI scripts, migrations,
 * background jobs), `getContext()` returns `{}`. Audit hooks bail when
 * `ctx.userId` is missing, so non-request work never writes audit rows.
 */
const { AsyncLocalStorage } = require('node:async_hooks');

const als = new AsyncLocalStorage();

/**
 * Run `fn` inside a context. Anything async-spawned by `fn` (including
 * Sequelize hooks) sees `getContext()` return this same object.
 */
function runWithContext(ctx, fn) {
  return als.run(ctx, fn);
}

/** Read the current context, or an empty object outside of a request. */
function getContext() {
  return als.getStore() || {};
}

module.exports = { runWithContext, getContext };
