const sequelize = require("./database/database.config");
const { User } = require("./models/Associator.model");
const bcrypt = require("bcrypt");

const hashedPassword = async () => {};

sequelize
  .sync({ force: true })
  .then(async () => {
    let result = await bcrypt.hash("vX34xG6^fqaFi!", 10);
    return result;
  })
  .then((pass) => {
    console.log("Database synced");
    User.create({
      name: "admin",
      password: pass,
    }).then((user) => {
      console.log("Admin user created with the password: 'vX34xG6^fqaFi!'");
      console.table(user.dataValues);
    });
  })
  .catch((error) => {
    console.log(error);
  });
