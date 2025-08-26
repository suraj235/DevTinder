const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: {
      type: String,
      required: true,
      MinLength: [3, "First name must be at least 3 characters."],
      MaxLength: [20, "First name cannot exceed 20 characters."],
    },
    lastName: {
      type: String,
      required: true,
      MinLength: [3, "Last name must be at least 3 characters."],
      MaxLength: [20, "Last name cannot exceed 20 characters."],
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        const isStrongPassword = validator.isStrongPassword(value);
        if (!isStrongPassword) {
          throw new Error("Password is not strong enough.");
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        const isValidEmail = validator.isEmail(value);
        if (!isValidEmail) {
          throw new Error("Invalid email format.");
        }
      },
    },
    age: {
      type: Number,
      required: true,
      min: [18, "You must be at least 18 years old."],
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "{VALUE} is not supported",
      },
    },
    location: { type: String, required: true },
    bio: { type: String, required: true, MaxLength: [500, "Bio cannot exceed 500 characters."] },
    profilePicture: {
      type: String,
      required: true,
      default:
        "https://img.freepik.com/premium-vector/profile-icon_838328-1033.jpg",
      validate(value) {
        const isValidURL = validator.isURL(value);
        if (!isValidURL) {
          throw new Error("Invalid URL format for profile picture.");
        }
      },
    },
    skills: {
      type: [String],
      default: [],
      validate(value) {
        if (value.length > 10) {
          throw new Error("A maximum of 10 skills are allowed.");
        }
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
