require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { connectMongoDb } = require("./Connection");

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));
app.use(bodyParser.json());

connectMongoDb(process.env.MONGODB_URI);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
