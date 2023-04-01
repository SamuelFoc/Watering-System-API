const router = require("express").Router();
const controller = require("../controllers/ESP32.controller");

// Exercise Routes
router.post("/", controller.updateMoisture);

module.exports = router;
