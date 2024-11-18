const mongoose = require('mongoose')

const adminLoginSchema = new mongoose.Schema({
    email: String,
    password: String
});

const Admin = mongoose.model('Admin', adminLoginSchema);
module.exports = Admin