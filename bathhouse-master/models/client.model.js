const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../createDBconnection');

const Client = sequelize.define("client", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gender: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });


module.exports = Client