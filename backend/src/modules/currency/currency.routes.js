'use strict';

const { Router } = require('express');
const requireJwtAuth = require('../../middleware/requireJwtAuth');
const requireRole = require('../../middleware/requireRole');
const { validate } = require('../../middleware/validate');
const controller = require('./currency.controller');
const {
  currencyCreateSchema,
  currencyUpdateSchema,
  currencyIdParamSchema,
  currencyIdAndDateParamSchema,
  currencyListQuerySchema,
  exchangeRateCreateSchema,
  exchangeRateListQuerySchema,
} = require('./currency.validation');

const router = Router();

router.use(requireJwtAuth);

const adminOnly = requireRole(['ADMIN']);

/* ---------- read (any authed user) ---------- */

router.get(
  '/',
  validate({ query: currencyListQuerySchema }),
  controller.list,
);

router.get(
  '/:currencyID',
  validate({ params: currencyIdParamSchema }),
  controller.getOne,
);

router.get(
  '/:currencyID/exchange-rates',
  validate({ params: currencyIdParamSchema, query: exchangeRateListQuerySchema }),
  controller.listExchangeRates,
);

router.get(
  '/:currencyID/rate-on-date/:date',
  validate({ params: currencyIdAndDateParamSchema }),
  controller.getRateOnDate,
);

/* ---------- write (ADMIN only) ---------- */

router.post(
  '/',
  adminOnly,
  validate({ body: currencyCreateSchema }),
  controller.create,
);

router.put(
  '/:currencyID',
  adminOnly,
  validate({ params: currencyIdParamSchema, body: currencyUpdateSchema }),
  controller.update,
);

router.delete(
  '/:currencyID',
  adminOnly,
  validate({ params: currencyIdParamSchema }),
  controller.softDelete,
);

router.post(
  '/:currencyID/exchange-rates',
  adminOnly,
  validate({ params: currencyIdParamSchema, body: exchangeRateCreateSchema }),
  controller.createExchangeRate,
);

router.put(
  '/:currencyID/set-as-base',
  adminOnly,
  validate({ params: currencyIdParamSchema }),
  controller.setAsBase,
);

module.exports = router;
