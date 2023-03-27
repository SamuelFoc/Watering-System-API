const handleLogout = (req, res) => {
  // Remove the token from the client-side
  res.clearCookie("access_token");

  // Remove the token from the server-side
  // You can also store the token in a blacklist or database to invalidate it
  // But for simplicity, we'll just remove it from memory
  req.user = null;

  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  handleLogout,
};
