// Import required models
const { User } = require("../models/Associator.model");
const bcrypt = require("bcrypt");

// Create a new user
const createUser = async (req, res) => {
  const isThere = await User.findOne({ where: { name: req.body.name } });
  if (isThere) {
    return res.status(409).json({ message: "User already exists" });
  }
  try {
    const { name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // encrypt password
    const user = await User.create({ name, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get users" });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user" });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, password } = req.body;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
    } // encrypt password

    const user = await User.findOne({ where: { id: id } });

    const [rowsUpdated] = await User.update(
      { name, password: password ? hashedPassword : user.password },
      { where: { id } }
    );
    if (rowsUpdated === 1) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await User.destroy({ where: { id } });
    if (rowsDeleted === 1) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
