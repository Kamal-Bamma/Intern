const express = require("express");
const Message = require("../models/Message");
const User = require("../models/Users");
const { validationResult } = require("express-validator");
const { authenticate } = require("../middleware/authenticateToken");
const router = express.Router();

router.get("/index", authenticate, async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const users = await User.find({ _id: { $ne: userId } });
    console.log(userId);
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "name")
      .populate("receiver", "name")
      .sort("timestamp");

    res.render("index.ejs", { messages, users, user: req.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/messages/:userId", async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const otherUserId = req.params.userId;
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    })
      .populate("sender", "name")
      .populate("receiver", "name")
      .sort("timestamp");

    res.json(messages);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/index", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { content, receiver } = req.body;
    const sender = req.user._id;

    const message = new Message({
      sender: sender,
      receiver: receiver,
      content: content,
    });

    await message.save();
    res.status(201).send("Message sent successfully");
  } catch (err) {
    res.status(500).send({ error: "Server error", message: err.message });
  }
});

module.exports = router;
