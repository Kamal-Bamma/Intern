const express = require("express");
const collection = require("./mongo");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("Exist");
    } else {
      res.json("Not-Exist");
    }
  } catch (e) {
    res.json("Not-Exist");
  }
});

app.post("/signuppage", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("Exist");
    } else {
      res.json("Not-Exist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("Not-Exist");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await collection.find({});
    res.json(users);
  } catch (e) {
    res.status(500).json("Error occurred while fetching users");
  }
});

app.delete("/users/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const result = await collection.deleteOne({ _id });

    if (result.deletedCount > 0) {
      res.json("User deleted");
    } else {
      res.status(404).json("User not found");
    }
  } catch (e) {
    console.error("Error in DELETE /users/:id:", e);
    res.status(500).json("Error occurred while deleting user");
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  // console.log({ id });
  try {
    // const findUser = await collection.findOne({ _id: id });
    // console.log({ findUser });
    const result = await collection.updateOne(
      { _id: id },
      { $set: { email: email, password: password } }
    );

    if (result.modifiedCount > 0) {
      res.json("User updated");
    } else {
      res.status(404).json("User not found or no changes made");
    }
  } catch {
    console.error("Error in PUT /users/:id", e);
    res.status(500).json("Error occurred while updating user");
  }
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
