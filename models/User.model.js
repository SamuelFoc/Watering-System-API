const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.config");

const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
