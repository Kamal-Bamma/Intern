const express = require("express");
// const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");
const { timeStamp } = require("console");

const app = express();
const PORT = 8000;

// Connection
mongoose
  .connect("mongodb://localhost:27017/login")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log("Mongo Err", err);
  });

// Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    job_title: {
      type: String,
    },
  },
  { TimeStamp: true }
);

// Model
const User = mongoose.model("user", userSchema);

// Middleware - {assume} - plugins
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use((req, res, next) => {
//     console.log(`Time now, ${Date.now()}`);
//   next();
// });

// Routes

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
        <ul>
            ${allDbUsers
              .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
              .join("")}
        </ul>
    `;
  res.send(html);
});

// Rest API

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});

  // res.setHeader("X-MyName", "Ross"); // Custom header
  // ALways add X to custom headers
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);

    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "user is not found" });
    return res.json(user);
  })

  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { last_name: "Blank" });
    return res.json({ status: "Success" });

    // const id = Number(req.params.id);
    // const userIndex = users.findIndex((user) => user.id === id);
    // if (userIndex === -1) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    // const updatedUser = { ...users[userIndex], ...req.body };
    // users[userIndex] = updatedUser;
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    //   if (err) {
    //     return res.status(500).json({ error: "Error updating user" });
    //   }
    //   return res.json(updatedUser);
    // });
  })

  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });

    // const id = Number(req.params.id);
    // const userIndex = users.findIndex((user) => user.id === id);
    // if (userIndex === -1) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    // users.splice(userIndex, 1);
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    //   if (err) {
    //     return res.status(500).json({ error: "Error deleting user" });
    //   }
    //   return res.json({ message: "User deleted successfully" });
    // });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (!body || !body.first_name || !body.last_name || !body.email) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  console.log("result", result);

  return res.status(201).json({ msg: "success" });
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(200).json({ status: "success", id: users.length });
  // });
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
