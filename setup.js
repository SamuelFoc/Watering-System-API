const sequelize = require("./database/database.config");
const { User } = require("./models/Associator.model");
const bcrypt = require("bcrypt");
const passwordGenerator = require("password-generator");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "\n This script will destroy whole database, are you sure you want to run it? (Y/N) ",
  async (answer) => {
    if (answer.toLowerCase() !== "y") {
      console.log("Aborted.");
      rl.close();
      return;
    }
    rl.question(
      "Do you want to enter your own password? (Y/N) ",
      async (answer) => {
        let password;

        if (answer.toUpperCase() === "Y") {
          password = await new Promise((resolve) => {
            rl.question("Enter your password: ", (passwordInput) => {
              resolve(passwordInput);
            });
          });
        } else {
          password = passwordGenerator(10, false);
          console.log(`Generated password: \t ${password}`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        sequelize
          .sync({ force: true })
          .then(() => {
            console.log("Database synced");

            User.create({
              name: "admin",
              password: hashedPassword,
            }).then((user) => {
              console.log(
                `Admin user created with the password: \t'${password}'`
              );
              console.table(user.dataValues);
              rl.close();
            });
          })
          .catch((error) => {
            console.log(error);
            rl.close();
          });
      }
    );
  }
);
