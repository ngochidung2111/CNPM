const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    MSSV: String,
    faculty: String,
    birthdate: String,
    email: String,
    phoneNumber: String,
    password: String,
    role: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
