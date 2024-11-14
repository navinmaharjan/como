const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors")
const bcrypt = require('bcryptjs');

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/como_DB");

const { Schema } = mongoose;
const userSchema = new Schema({
  fullName: String,
  email: { type: String, unique: true },
  mobile: Number,
  password: String,
});

const User = mongoose.model('User', userSchema);
app.use(express.json())
app.use(cors())

app.post("/register", async (req, res) => {
  try {
    const isEmailExist = await User.exists({ email: req.body.email });
    if (isEmailExist) {
      res.status(409).json({
        msg: "Email already Exist"
      });
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPassword;
      await User.create(req.body);
      res.status(201).json({
        msg: "User created successfully",
      });
    }
  } catch (error) {
    console.error("Error registering new user:", error);
    res.status(500).json({
      msg: "An unexpected error occurred",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
