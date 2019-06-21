const router = require('express').Router();
const request = require('request');

router.get('/:imdbId', (req, res, next) => {
  try {
    request({
      uri: 'http://www.omdbapi.com/',
      qs: {
        apikey: process.env.OMDB_API_KEY,
        i: req.params.imdbId
      }
    }).pipe(res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
