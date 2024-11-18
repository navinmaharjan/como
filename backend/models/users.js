const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    mobile: Number,
    password: String,
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users