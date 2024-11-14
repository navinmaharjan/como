const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors")

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/comoDb");

const { Schema } = mongoose;
const userSchema = new Schema({
  fullName: String,
  email: String,
  mobile: Number,
  password: String,
});

const User = mongoose.model('User', userSchema);
app.use(express.json())
app.use(cors())

app.post("/register", (req, res) => {
  User.create(req.body)
  res.send('ok')
});

app.listen(8000, () => {
  console.log(`Example app listening on port ${port}`);
});
