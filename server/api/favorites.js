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
      const createMe = await Favorite.create({
        movieId,
        userId: req.user.id
      });
      const newFavorite = await Favorite.findByPk(createMe.id, {
        include: [{ model: Movies }]
      });
      res.status(201).json(newFavorite);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.body;
      const affectedRows = await Favorite.destroy({
        where: {
          id
        }
      });
      if (!affectedRows) {
        res.sendStatus(404);
      } else {
        res.status(204).json(affectedRows);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});
