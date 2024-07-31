const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  handleConversation,
  handleSaveChat,
} = require("../controller/messageController");

const router = express.Router();

router.post("/chat", authenticateToken, handleSaveChat);

router.get("/chat/:userId", authenticateToken, handleConversation);

module.exports = router;
