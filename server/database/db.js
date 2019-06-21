'use strict';

const chalk = require('chalk');
const Sequelize = require('sequelize');

console.log(chalk.yellow('Launching database connection...'));

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/nyscene',
  {
    logging: false
  }
);

module.exports = db;
