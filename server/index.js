'use strict';
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { db, User } = require('./database/index');
const sessionStore = new SequelizeStore({ db });

if (process.env.NODE_ENV !== 'production') require('../secrets');

//logging middleware:
app.use(morgan('dev'));

//body parser middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session middleware:
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'The most robust of secrets...',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);

// OAUTH Passport middleware

// initialize takes in our req.session so passport can use it
app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//static middleware:
app.use(express.static(path.join(__dirname, '../public')));

//backend routes:
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

//sending index.html to requesting client
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
