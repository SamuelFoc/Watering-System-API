const router = require("express").Router();
const controller = require("../controllers/Flower.controller");

// Exercise Routes
router
  .get("/", controller.getFlowers)
  .get("/:id", controller.getFlowerById)
  .get("/moisture/:id", controller.measureMoisture)
  .get("/watering/:id", controller.waterFlower)
  .post("/", controller.createFlower)
  .put("/:id", controller.updateFlower)
  .delete("/:id", controller.deleteFlower);

module.exports = router;
