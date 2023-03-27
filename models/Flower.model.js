const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.config");

const Flower = sequelize.define("flower", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  watering_pin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  moisture_pin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  set_moisture: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  actual_moisture: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = Flower;
