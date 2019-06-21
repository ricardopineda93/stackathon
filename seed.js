const { db, Movies, User, Favorite } = require('./server/database/index');
const { green, red } = require('chalk');
const moviesDataSeed = JSON.parse(
  require('fs').readFileSync('./locationAndMovieData.json', 'utf8')
);
const userSeed = [
  { email: 'rpini@email.com', password: '12345' },
  { email: 'cody@thepug.com', password: 'cody' }
];
const favoritesSeed = [
  { userId: 1, movieId: 1 },
  { userId: 1, movieId: 2 },
  { userId: 2, movieId: 3 },
  { userId: 2, movieId: 4 }
];

const seed = async () => {
  await db.sync({ force: true });

  await Promise.all(moviesDataSeed.map(movie => Movies.create(movie)));
  await Promise.all(userSeed.map(user => User.create(user)));
  await Promise.all(favoritesSeed.map(favorite => Favorite.create(favorite)));

  console.log(green('Seeded and sowed!'));
  db.close();
};

seed().catch(err => {
  console.error(red('Oops! Likes like there was an issue seeding!'));
  console.error(err);
  db.close();
});
