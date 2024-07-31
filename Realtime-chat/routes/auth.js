const express = require("express");
const {
  handleRegisterUser,
  handleLoginUser,
  handleLogoutUser,
  handleDisplayUserRegister,
  handleDisplayUserLogin,
} = require("../controller/authController");

const router = express.Router();

router.get("/register", handleDisplayUserRegister);
router.get("/index", (req, res) => {
  res.render("index.ejs");
});
router.get("/login", handleDisplayUserLogin);
router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);
router.get("/logout", handleLogoutUser);

module.exports = router;
