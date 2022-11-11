const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../createDBconnection');

const Price = sequelize.define("prices", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    period_start: {
      type: Sequelize.STRING,
      allowNull: false
    },
    period_end: {
      type: Sequelize.STRING,
      allowNull: false
    },
    day_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price_for: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    additional_data: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  });


module.exports = Price