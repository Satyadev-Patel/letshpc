const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

// Chat Database

const Users = new mongoose.Schema({
    email: String,
    password: String,
}, { collection: 'users' });

Users.plugin(timestamp);
const users = mongoose.model("Users", Users);
module.exports = users;