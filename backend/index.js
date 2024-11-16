const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid email!" });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ msg: "Invalid password!" });
    }
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' }); // Added expiration time for better security
    res.json({
      token,
      user,
      isLoggedIn: true,
      msg: "Login Successful"
    });
  } catch (error) {
    console.error(error); // Logging the error for debugging purposes
    res.status(500).json({ msg: "Server error. Please try again later." }); // Properly handling the server error
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
