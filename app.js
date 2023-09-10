const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // import cors package
require("dotenv").config();
const app = express();

// Require routes
const esp32Routes = require("./routes/Esp32.routes");

// CORS policy
app.use(cors());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Logging In
app.use("/api", esp32Routes);

app.listen(process.env.PORT, () => {
  console.log(
    "Server running on : http://localhost:" + process.env.PORT + "\n"
  );
});
