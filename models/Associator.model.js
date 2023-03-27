// Sequelize
const sequelize = require("../database/database.config");

// Require the models
const User = require("./User.model");
const Flower = require("./Flower.model");

// TrainingWeek associations
User.hasMany(Flower);
Flower.belongsTo(User);

// Sync the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Models synced");
  })
  .catch((error) => {
    console.error("Error syncing models:", error);
  });

module.exports = {
  User,
  Flower,
};
