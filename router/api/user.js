const Router = require('koa-router');
const bcryptjs = require('bcryptjs');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const User = require('../../model/User');
const { responseData, bcrypt } = require('../../utils');
const { TOKEN_SECRET } = require('../../config/key');
const isValidate = require('../../validation/register');
const router = new Router();

router.post('/register', async ctx => {
  const { email, password, avatar } = ctx.request.body;
  const findResult = await User.find({ email });

  const { errors, isValid } = isValidate(ctx.request.body);
  if (!isValid) {
    ctx.body = errors;
    return;
  }

  if (findResult.length) {
    responseData(ctx, 500, '该邮箱已被注册！');
    return;
  }
  if (!email) {
    responseData(ctx, 400, 'email field is required！');
    return;
  }
  if (!password) {
    responseData(ctx, 400, 'password field is required！');
    return;
  }

  const user = new User({
    email,
    password
  });

  bcrypt(password, user, 'password');

  try {
    await user.save();
    ctx.body = user;
  } catch (e) {
    responseData(ctx, 400, 'register:err');
  }
});

router.post('/login', async ctx => {
  const { email, password } = ctx.request.body;
  const findResult = await User.find({ email });

  if (findResult.length) {
    const { _id, email, password: hashPassword } = findResult[0];
    const checkPassword = bcryptjs.compareSync(password, hashPassword);

    if (checkPassword) {
      const payload = { id: _id, email };
      const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: 7200 });
      ctx.body = { status: 200, message: '登录成功!', token: `Bearer ${token}` };

      return;
    }

    responseData(ctx, 400, '密码错误!');
    return;
  }

  responseData(ctx, 400, '邮箱账号错误！');
})

router.get('/getUserInfo', passport.authenticate('jwt', { session: false }), async ctx => {
  const { _id, email, date } = ctx.state.user || {};
  ctx.body = { id: _id, email, date };
})

module.exports = router.routes();