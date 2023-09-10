const logIncomingData = async (req, res) => {
  try {
    const data = req.body;
    console.log(data, req.params);
    res.status(200).send("Data received and updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  logIncomingData,
};
