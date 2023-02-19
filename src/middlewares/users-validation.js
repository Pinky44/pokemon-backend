const { check } = require('express-validator');
const { validateResult } = require('./result-validation');

const registrationValidation = [
  check('login')
    .isString()
    .trim()
    .isLength({ min: 6 })
    .withMessage('Длина должна быть больше 6 символов'),
  check('password')
    .isString()
    .trim()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/g)
    .withMessage(
      'Длина должна быть не меньше 6 символов и обязательно латинские символы, строка обязательно должна содержать 1 число'
    ),
  validateResult,
];

const authorizationValidation = [
  check('login')
    .isString()
    .trim()
    .notEmpty(),
  check('password')
    .isString()
    .trim()
    .notEmpty(),
  validateResult,
];

module.exports = {
  registrationValidation,
  authorizationValidation,
};
