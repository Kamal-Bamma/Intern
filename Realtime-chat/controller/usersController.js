const User = require("../models/Users");

const handleDisplayUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("Users", { users });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { handleDisplayUsers };
