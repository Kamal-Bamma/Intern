const express = require("express");
const {
  displayRegister,
  registerUser,
  displayLogin,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

router.get("/register", displayRegister);
router.get("/login", displayLogin);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
