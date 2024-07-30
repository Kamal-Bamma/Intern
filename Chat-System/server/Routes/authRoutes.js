const express = require("express");
const {
  handleDisplayRegister,
  handleDisplayLogin,
  handleRegisterUser,
  handleLoginUser,
  handleLogoutUser,
} = require("../Controller/authController");

const router = express.Router();

router.get("/register", handleDisplayRegister);
router.get("/login", handleDisplayLogin);
router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);
router.get("/logout", handleLogoutUser);

module.exports = router;
