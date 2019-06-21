const router = require('express').Router();
const { Favorite, Movies } = require('../database/index');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const favorites = await Favorite.findAll({
        where: {
          userId: req.user.id
        },
        include: [{ model: Movies }]
      });
      res.json(favorites);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const { movieId } = req.body;
      const favorite = await Favorite.create({
        movieId,
        userId: req.user.id
      });
      res.status(201).json(favorite);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});
