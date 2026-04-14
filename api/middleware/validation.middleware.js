const { validationResult } = require('express-validator');
const { errorHandler } = require('../utils/error');

function handleValidation(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errorHandler(400, errors.array().map((e) => e.msg).join(', ')));
  }
  next();
}

module.exports = { handleValidation };
