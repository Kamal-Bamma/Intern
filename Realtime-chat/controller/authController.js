const User = require("../models/Users");
const bcrypt = require("bcrypt");

const handleDisplayUserRegister = (req, res) => {
  res.render("register.ejs");
};

const handleDisplayUserLogin = (req, res) => {
  res.render("login.ejs");
};

const handleRegisterUser = async (req, res) => {
  const { name, email, password } = req.body;

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
      });
      await newUser.save();
      res.redirect("/login");
    }
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("User doesn't exist");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        req.session.user = user;
        req.user = user;
        return res.redirect("/index");
      } else {
        res.status(400).json("Incorrect password");
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
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
  handleDisplayUserLogin,
  handleDisplayUserRegister,
  handleRegisterUser,
  handleLoginUser,
  handleLogoutUser,
};
