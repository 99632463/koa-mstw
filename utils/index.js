const bcryptjs = require('bcryptjs');

const responseData = (ctx, status, message) => {
  return ctx.body = { status, message };
}

const bcrypt = (password, data, field) => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);
  data[field] = hash;
}

module.exports = {
  responseData,
  bcrypt
}