const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateProfileInput, validateOldPassword } = require("../helpers/validations");
const bcrypt = require("bcrypt");

profileRouter.post("/view", userAuth, (req, res) => {
  try {
    res.json({
      status: 200,
      message: "Profile fetched successfully",
      data: req.user,
    });
  } catch (error) {
    res.status(400).send("Error fetching profile: " + error.message);
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    validateProfileInput(req);

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      status: 200,
      message: "Profile updated successfully",
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Error updating profile: " + error.message);
  }
});

profileRouter.patch("/reset-password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const currentPassword = loggedInUser.password;
    const { oldPassword, newPassword } = req.body;

    await validateOldPassword(oldPassword, currentPassword);

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = newPasswordHash;
    await loggedInUser.save();

    res.json({
      status: 200,
      message: "Password updated successfully",
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Error updating password: " + error.message);
  }
});

module.exports = profileRouter;
