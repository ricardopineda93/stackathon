'use strict';
const { cyan, magenta, bgYellow } = require('chalk');
const { db } = require('./server/database/index');
const app = require('./server/index');
const PORT = process.env.PORT || 8080;

db.sync().then(() => {
  console.log(cyan('db synced!'));
  app.listen(PORT, () =>
    console.log(magenta.bgYellow(`Serving up the scenes on port ${PORT}!`))
  );
});
