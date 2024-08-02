const express = require("express");
const Message = require("../models/Message");
const User = require("../models/Users");
const { authenticate } = require("../middleware/authenticateToken");
const router = express.Router();

router.get("/index", authenticate, async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const users = await User.find({ _id: { $ne: userId } });
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

// router.get("/messages/:userId", authenticate, async (req, res) => {
//   try {
//     const userId = req.user ? req.user._id : null;
//     const otherUserId = req.params.userId;
//     console.log(userId);
//     console.log(otherUserId);

//     if (!userId || !otherUserId) {
//       return res.status(400).send("User ID or Other User ID missing");
//     }

//     const messages = await Message.find({
//       $or: [
//         { sender: userId, receiver: otherUserId },
//         { sender: otherUserId, receiver: userId },
//       ],
//     })
//       .populate("sender", "name")
//       .populate("receiver", "name")
//       .sort("timestamp");

//     res.json(messages);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

router.post("/index", async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    console.log(req.body);
    if (!senderId || !receiverId || !content) {
      return res.status(400).send({ message: "Missing info" });
    }
    const conversation = await Message.findOne({ senderId, receiverId });

    if (!conversation) {
      const messages = new Message({
        senderId,
        receiverId,
        content: [{ text: content }],
      });
      await messages.save();
    } else {
      conversation.content.push({ text: content });
      await conversation.save();
    }

    res.status(200).json("Message sent");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
