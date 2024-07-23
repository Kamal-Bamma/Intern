const express = require("express");
const {
  displayUser,
  displayUserUpdateForm,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", displayUser);
router.get("/edit/:id", displayUserUpdateForm);
router.post("/edit/:id", updateUser);
router.post("delete/:id", deleteUser);

module.exports = router;
