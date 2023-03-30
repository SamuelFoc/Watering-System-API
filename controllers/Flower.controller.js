const { Flower } = require("../models/Associator.model");
const sequelize = require("../database/database.config");
const raspi = require("../Interface/Raspberry.core");

// Create a new flower and assign it to the authenticated user
const createFlower = async (req, res) => {
  try {
    const { info, pins } = req.body;
    const { name, set_moisture } = info;
    const sortedPins = pins.sort((a, b) => parseInt(a) - parseInt(b));
    const moisture_pin = sortedPins[0];
    const watering_pin = sortedPins[1];

    const flower = await Flower.create({
      name,
      set_moisture,
      watering_pin,
      moisture_pin,
      userId: req.user.id, // Assign the flower to the authenticated user
    });
    res.status(201).json({ flower });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create flower" });
  }
};

// GET /flowers/:id
const getFlowerById = async (req, res) => {
  try {
    const flower = await Flower.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id, // Only return the flower if it belongs to the authenticated user
      },
    });

    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }

    return res.json(flower);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all flowers belonging to the authenticated user
const getFlowers = async (req, res) => {
  try {
    const flowers = await Flower.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json({ flowers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get flowers" });
  }
};

// Update a flower belonging to the authenticated user
const updateFlower = async (req, res) => {
  try {
    const { name, set_moisture } = req.body;
    const flower = await Flower.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!flower) {
      return res.status(404).json({ error: "Flower not found" });
    }
    flower.name = name;
    flower.set_moisture = set_moisture;
    await flower.save();
    res.status(200).json({ flower });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update flower" });
  }
};

// Delete a flower belonging to the authenticated user
const deleteFlower = async (req, res) => {
  try {
    const flower = await Flower.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!flower) {
      return res.status(404).json({ error: "Flower not found" });
    }
    await flower.destroy();
    res.status(204).json();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete flower" });
  }
};

const measureMoisture = async (req, res) => {
  const id = req.params.id;
  const flower = await Flower.findByPk(id);
  let value;

  if (!flower) {
    res.status(404).json({ message: `Flower with ID ${id} not found` });
    return;
  }

  const { moisture_pin } = flower;

  try {
    value = await raspi.readMoisture(moisture_pin);
  } catch (error) {
    res.status(500).json({
      message: `We were unable to read the moisture of the flower with ID ${id}.`,
    });
    return;
  }

  await flower.update({ actual_moisture: value });

  console.log(`Measured moisture for flower ${flower.name}: ${value}`);

  res.status(200).json({ actual_moisture: value });
};

const waterFlower = async (req, res) => {
  const id = req.params.id;
  const duration = req.query.duration || 1000; // default duration is 1 second

  const flower = await Flower.findByPk(id);

  if (!flower) {
    res.status(404).json({ message: `Flower with ID ${id} not found` });
    return;
  }

  const { watering_pin } = flower;

  try {
    await raspi.turnOnRelay(watering_pin, duration);
  } catch (error) {
    res
      .status(500)
      .json({ message: `We were unable to water the flower with ID ${id}.` });
    return;
  }

  res.status(200).json({
    message: "Watering...",
    duration: duration,
  });
};

const getUsedPins = async (req, res) => {
  try {
    const usedWateringPins = await Flower.findAll({
      attributes: [
        [
          sequelize.fn("DISTINCT", sequelize.col("watering_pin")),
          "watering_pin",
        ],
      ],
      raw: true,
    });

    const usedMoisturePins = await Flower.findAll({
      attributes: [
        [
          sequelize.fn("DISTINCT", sequelize.col("moisture_pin")),
          "moisture_pin",
        ],
      ],
      raw: true,
    });

    const usedPins = {
      watering_pins: usedWateringPins.map((flower) => flower.watering_pin),
      moisture_pins: usedMoisturePins.map((flower) => flower.moisture_pin),
    };

    res.status(200).json(usedPins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createFlower,
  getFlowers,
  updateFlower,
  deleteFlower,
  getFlowerById,
  waterFlower,
  measureMoisture,
  getUsedPins,
};
