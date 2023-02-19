const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

const validateResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw ApiError.BadRequest('Ошибка валидации', errors);
  }
  
  next();
}

module.exports = { validateResult };
