const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/mydb.sqlite",
  logging: false,
});

module.exports = sequelize;
