const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../createDBconnection');

const Reservation = sequelize.define("reservations", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    client_name: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    client_phone: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    created_by_admin: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    gender: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });


module.exports = Reservation