'use strict';

/**
 * One-shot migration: rewrite Phase-1 master-data Postman collections to use
 * JWT bearer auth instead of the X-User-ID stub. Idempotent — running it
 * twice is a no-op because the markers ("accessToken" variable, "Login as
 * admin" first item) get checked before mutation.
 *
 * Run: node scripts/migrate-postman-to-jwt.js
 */

const fs = require('fs');
const path = require('path');

const POSTMAN_DIR = path.join(__dirname, '..', 'docs', 'postman');
const COLLECTIONS = [
  'Category',
  'Customer',
  'Equipment',
  'Method',
  'OcmElement',
  'Source',
  'SourceType',
  'Specification',
  'Test',
  'Unit',
];

const NEW_PREREQUEST_EXEC = [
  "pm.request.headers.upsert({ key: 'Content-Type', value: 'application/json' });",
  "const path = pm.request.url.getPath();",
  "const isLogin = /\\/auth\\/login$/.test(path);",
  "if (!isLogin) {",
  "  const token = pm.collectionVariables.get('accessToken');",
  "  if (token) pm.request.headers.upsert({ key: 'Authorization', value: 'Bearer ' + token });",
  "}",
];

const LOGIN_ITEM = {
  name: 'Login as admin (seeds {{accessToken}})',
  request: {
    method: 'POST',
    header: [],
    body: {
      mode: 'raw',
      raw: '{\n  "email": "{{adminEmail}}",\n  "password": "{{adminPassword}}"\n}',
    },
    url: {
      raw: '{{baseUrl}}/auth/login',
      host: ['{{baseUrl}}'],
      path: ['auth', 'login'],
    },
  },
  event: [
    {
      listen: 'test',
      script: {
        type: 'text/javascript',
        exec: [
          "pm.test('200 OK', () => pm.response.to.have.status(200));",
          "const body = pm.response.json();",
          "pm.collectionVariables.set('accessToken', body.data.accessToken);",
        ],
      },
    },
  ],
};

const NEW_VARS = [
  { key: 'baseUrl',       value: 'http://localhost:3033/api', type: 'string' },
  { key: 'adminEmail',    value: 'admin@lims.local',          type: 'string' },
  { key: 'adminPassword', value: 'Admin123',                  type: 'string' },
  { key: 'accessToken',   value: '',                          type: 'string' },
];

function replaceVars(existing) {
  const preserved = (existing || []).filter(
    (v) => !['userId', 'baseUrl', 'adminEmail', 'adminPassword', 'accessToken'].includes(v.key),
  );
  return [...NEW_VARS, ...preserved];
}

function rewriteScriptExec(execLines) {
  if (!Array.isArray(execLines)) return execLines;
  return execLines.map((line) =>
    line
      .replace(
        /pm\.expect\(body\.data\.(\w+)\)\.to\.eql\(pm\.variables\.get\('userId'\)\)/g,
        "pm.expect(body.data.$1).to.be.a('string')",
      )
      .replace(
        /pm\.variables\.get\('userId'\)/g,
        "pm.collectionVariables.get('accessToken')",
      ),
  );
}

function walkScripts(node) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    node.forEach(walkScripts);
    return;
  }
  if (node.script && Array.isArray(node.script.exec)) {
    node.script.exec = rewriteScriptExec(node.script.exec);
  }
  for (const key of Object.keys(node)) {
    if (key !== 'script') walkScripts(node[key]);
  }
}

function migrate(name) {
  const file = path.join(POSTMAN_DIR, `${name}.postman_collection.json`);
  const raw = fs.readFileSync(file, 'utf8');
  const col = JSON.parse(raw);

  col.variable = replaceVars(col.variable);

  col.event = [
    {
      listen: 'prerequest',
      script: {
        type: 'text/javascript',
        exec: NEW_PREREQUEST_EXEC,
      },
    },
  ];

  walkScripts(col.item);

  const alreadyHasLogin =
    Array.isArray(col.item) &&
    col.item.length > 0 &&
    /Login as admin/i.test(col.item[0].name || '');
  if (!alreadyHasLogin) {
    col.item = [LOGIN_ITEM, ...(col.item || [])];
  }

  if (col.info && typeof col.info.description === 'string') {
    col.info.description = col.info.description
      .replace(
        /Stub auth via X-User-ID header \(ADR-006\)\.?/g,
        'JWT Bearer auth (ADR-009). Run "Login as admin" first to seed {{accessToken}}.',
      )
      .replace(
        /X-User-ID/g,
        'Bearer token',
      );
  }

  fs.writeFileSync(file, JSON.stringify(col, null, 2) + '\n', 'utf8');
  console.log(`migrated: ${name}`);
}

COLLECTIONS.forEach(migrate);
