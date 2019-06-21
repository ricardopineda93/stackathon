const router = require('express').Router();
const { Movies } = require('../database/index');

router.get('/', async (req, res, next) => {
  try {
    res.json(await Movies.findAll());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
