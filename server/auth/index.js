const router = require('express').Router();
const User = require('../database/user');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log(
        'Could not locate account associated to email:',
        req.body.email
      );
      res.status(401).send('Incorrect email and/or password!');
    } else if (!user.correctPassword(req.body.password)) {
      console.log(
        'Incorrect password for account associated with: ',
        req.body.email
      );
      res.status(401).send('Wrong email and/or password!');
    } else {
      req.login(user, error => (error ? next(error) : res.json(user)));
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, error => (error ? next(error) : res.json(user)));
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Email already assiciated with existing account!');
    } else {
      next(error);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect('/login');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
