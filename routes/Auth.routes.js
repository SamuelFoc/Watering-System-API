const router = require("express").Router();
const auth = require("../controllers/Auth.controller");
const authout = require("../controllers/Logout.controller");

// Exercise Routes
router.get("/Out", authout.handleLogout).post("/In", auth.handleLogin);

module.exports = router;
