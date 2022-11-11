const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../createDBconnection');

const Admin = sequelize.define("admin", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: true 
    }
  });


module.exports = Admin