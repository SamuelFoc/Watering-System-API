const { Flower } = require("../models/Associator.model");

const updateMoisture = async (req, res) => {
  try {
    const data = req.body;

    // loop through the received data and update the corresponding flower records
    for (const item of data) {
      const { flower_id, actual_moisture } = item;
      const flower = await Flower.findByPk(flower_id);

      if (flower) {
        await flower.update({ actual_moisture });
      }
    }

    res.status(200).send("Data received and updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  updateMoisture,
};
