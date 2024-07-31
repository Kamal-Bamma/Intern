// const express = require("express");
// const Message = require("../models/Message");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// const router = express.Router();

// // Middleware to authenticate the token
// const authenticateToken = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).send("Access Denied");

//   try {
//     const verified = jwt.verify(token, "secretkey");
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid Token");
//   }
// };

// router.post("/", authenticateToken, async (req, res) => {
//   try {
//     const { receiverId, content } = req.body;
//     const message = new Message({
//       sender: req.user.id,
//       receiver: receiverId,
//       content,
//     });
//     await message.save();
//     res.status(201).send("Message sent successfully");
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

// router.get("/:userId", authenticateToken, async (req, res) => {
//   try {
//     const messages = await Message.find({
//       $or: [
//         { sender: req.user.id, receiver: req.params.userId },
//         { sender: req.params.userId, receiver: req.user.id },
//       ],
//     }).sort("timestamp");
//     res.json(messages);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

// module.exports = router;
