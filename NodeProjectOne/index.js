// const users = require("./MOCK_DATA.json");
const express = require("express");
const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middleware");

const userRouter = require("./routes/users");

const app = express();
const PORT = 8000;

// Connection
connectMongoDb("mongodb://localhost:27017/login").then(() => {
  console.log("MongoDb connected!");
});

// Middleware - {assume} - plugins
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
