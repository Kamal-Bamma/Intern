const express = require("express");
const {
  handleDisplayVendorRegister,
  handleDisplayVendorLogin,
  handleRegisterVendor,
  handleLoginVendor,
  handleLogoutVendor,
} = require("../Controller/vendorController");

const router = express.Router();

router.get("/vendorRegister", handleDisplayVendorRegister);
router.get("/vendorlogin", handleDisplayVendorLogin);
router.post("/vendorRegister", handleRegisterVendor);
router.post("/vendorLogin", handleLoginVendor);
router.get("/logout", handleLogoutVendor);

module.exports = router;
