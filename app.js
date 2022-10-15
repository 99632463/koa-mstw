const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const passport = require('koa-passport');
const { MONGO_URL } = require('./config/key');

const app = new Koa();
const router = new Router();

router.use('/api/user', require('./router/api/user'));
router.use('/api/profile', require('./router/api/profile'));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('connect success'))
  .catch(err => console.log('connect error: ', err))

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on ${port}......`));