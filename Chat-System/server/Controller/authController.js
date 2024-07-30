const User = require("../Models/userModels");
const bcrypt = require("bcrypt");

const handleDisplayRegister = async (req, res) => {
  res.render("register.ejs");
};

const handleDisplayLogin = async (req, res) => {
  res.render("login.ejs");
};

const handleRegisterUser = async (req, res) => {
  const { name, email, password, roles } = req.body;

  try {
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        roles,
      });
      await newUser.save();
      res.redirect("/login");
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const handleLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const handleLogoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.redirect("/login");
  });
};

module.exports = {
  handleDisplayRegister,
  handleDisplayLogin,
  handleRegisterUser,
  handleLoginUser,
  handleLogoutUser,
};
