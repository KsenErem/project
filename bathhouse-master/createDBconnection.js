const { Sequelize } = require('sequelize');
const { DB_CONNECT } = require('./config');

const sequelize = new Sequelize(DB_CONNECT);

module.exports = sequelize;