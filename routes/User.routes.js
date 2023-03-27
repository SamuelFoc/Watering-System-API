const router = require("express").Router();
const controller = require("../controllers/User.controller.js");

// Exercise Routes
router
  .get("/", controller.getUsers)
  .get("/:id", controller.getUserById)
  .post("/", controller.createUser)
  .put("/:id", controller.updateUserById)
  .delete("/:id", controller.deleteUserById);

module.exports = router;
