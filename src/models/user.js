const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true},
    password:{type: String, requited: true}
});

const User = mongoose.model("Course-User", userSchema);

module.exports = User;