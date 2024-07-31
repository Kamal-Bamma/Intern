const mongoose = require("mongoose");

const connectMongoDb = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected..!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

module.exports = { connectMongoDb };
