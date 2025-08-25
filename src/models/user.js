const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  bio: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
