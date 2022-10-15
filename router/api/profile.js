const Router = require('koa-router');
const passport = require('koa-passport');
const router = new Router();
const Profile = require('../../model/Profile');

router.post('/add', passport.authenticate('jwt', { session: false }), async ctx => {
  const { title, desc } = ctx.request.body;
  const { id } = ctx.state.user || {};
  const newProfileDate = { title, desc };
  const findResult = await Profile.find({ user: id });

  if (findResult.length) {
    const profileUpdate = await Profile.findOneAndUpdate(
      { user: id },
      { $set: newProfileDate },
      { new: true }
    );

    ctx.body = profileUpdate;
    return;
  }

  new Profile({
    user: id,
    title,
    desc
  }).save()
    .then((profile) => ctx.body = profile)
    .catch(err => console.log('err: ', err))
});

router.get('/list', passport.authenticate('jwt', { session: false }), async ctx => {
  const { id } = ctx.state.user || {};
  const profile = await Profile.find({ user: id }).populate('user', ['email']);
  console.log('profile: ', profile)
})

module.exports = router.routes();