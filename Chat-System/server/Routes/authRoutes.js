const express = require("express");
const {
  handleRegisterUser,
  handleLoginUser,
  handleLogoutUser,
  handleDisplayUserRegister,
  handleDisplayUserLogin,
} = require("../Controller/authController");

const router = express.Router();

router.get("/userRegister", handleDisplayUserRegister);
router.get("/userlogin", handleDisplayUserLogin);
router.post("/userRegister", handleRegisterUser);
router.post("/userLogin", handleLoginUser);
router.get("/logout", handleLogoutUser);

module.exports = router;
