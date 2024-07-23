const User = require("../models/users");

const displayUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const users = await User.find();
    res.render("users", { users, user: req.user, user_id });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const displayUserUpdateForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.render("edit", { user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    await user.save();

    res.redirect("/users");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/users");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  displayUser,
  displayUserUpdateForm,
  updateUser,
  deleteUser,
};
