const Message = require("../models/Message");

const handleDisplayChat = (req, res) => {
  res.render("chat.ejs");
};

const handleSaveChat = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    console.log(req.body);
    const message = new Message({
      sender: req.user.id,
      receiver: receiverId,
      content,
    });
    await message.save();
    res.status(201).send("Message sent successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const handleConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id },
      ],
    }).sort("timestamp");
    res.json(messages);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { handleDisplayChat, handleSaveChat, handleConversation };
