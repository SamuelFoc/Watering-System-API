const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/Associator.model");

const handleLogin = async (req, res) => {
  const { name, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ where: { name: name } });

  // If the user doesn't exist, return an error
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Sign a JWT token with the user ID and send it back to the client
  const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  res.json({ token });
};

module.exports = {
  handleLogin,
};
