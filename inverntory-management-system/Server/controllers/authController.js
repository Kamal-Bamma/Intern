const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const { isAdmin } = require("../middleware/authMiddleware");

const displayRegister = async (req, res) => {
  res.render("register");
};

const registerUser = async (req, res) => {
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

const displayLogin = async (req, res) => {
  res.render("login");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("User doesn't exist");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        req.session.user = user; // Set the session user after successful login
        req.user = user; // Set req.user
        return isAdmin(req, res, () => res.redirect("/index")); // Call isAdmin middleware
      } else {
        res.status(400).json("Incorrect password");
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.redirect("/login");
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  displayRegister,
  displayLogin,
};
