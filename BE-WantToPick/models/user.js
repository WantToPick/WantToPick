const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Custom user ID as the primary key
    name: { type: String, required: true },
    birthdate: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true }, // Username added
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema, 'userdb'); // userdb collection

module.exports = User;