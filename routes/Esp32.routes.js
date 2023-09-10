const router = require("express").Router();
const controller = require("../controllers/ESP32.controller");

// Exercise Routes
router.put("/rooms/:id", controller.logIncomingData);

module.exports = router;
