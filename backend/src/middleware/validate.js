'use strict';

function validate(schemas = {}) {
  return (req, _res, next) => {
    try {
      req.validated = { body: undefined, query: undefined, params: undefined };
      if (schemas.body)   req.validated.body   = schemas.body.parse(req.body);
      if (schemas.query)  req.validated.query  = schemas.query.parse(req.query);
      if (schemas.params) req.validated.params = schemas.params.parse(req.params);
      return next();
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = { validate };
