const validator = require('validator');
const isEmpty = require('./is-empty');

const isValidate = body => {
  const { email } = body;
  const errors = {};

  if (!validator.isLength(email, { min: 2, max: 30 })) {
    errors.name = '邮箱长度不能小于2位且不能大于30位！';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = isValidate;