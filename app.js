const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors"); // import cors package
const passportJWTAuth = require("./security/JWTpass.config");
require("dotenv").config();
const app = express();

// Require routes
const authRoutes = require("./routes/Auth.routes");
const usersRoutes = require("./routes/User.routes");
const flowersRoutes = require("./routes/Flower.routes");
const esp32Routes = require("./routes/Esp32.routes");

// CORS policy
app.use(cors());
// Passport
app.use(passport.initialize());
// Cookies
app.use(cookieParser());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Logging In
app.use("/api/v1/Auth", authRoutes);
app.use("/api/v1/esp32-update", esp32Routes);
app.use("/api/v1/Users", passportJWTAuth, usersRoutes);
app.use("/api/v1/Flowers", passportJWTAuth, flowersRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    "Server running on : http://localhost:" + process.env.PORT + "\n"
  );
});
