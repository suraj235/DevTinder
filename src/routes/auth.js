const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { validateSingnupInput } = require("../helpers/validations");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    // Validate user input
    validateSingnupInput(req);
    // Encrypt password
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: firstName + Math.random().toString(36).substring(2, 5),
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(400).send("Error creating user: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Invalid Credentials!");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).send("Invalid Credentials!");
    }

    // Setting up JWT token
    const token = await user.getJWT();
    res.cookie("token", token);

    res.status(200).send("Login Successful!");
  } catch (error) {
    res.status(400).send("Error logging in: " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Logout Successful!!");
  } catch (error) {
    res.status(400).send("Error logging out: " + error.message);
  }
});

module.exports = authRouter;
