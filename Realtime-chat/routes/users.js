const express = require("express");

const { handleDisplayUsers } = require("../controller/usersController");

const router = express.Router();

router.get("/users", handleDisplayUsers);

module.exports = router;
