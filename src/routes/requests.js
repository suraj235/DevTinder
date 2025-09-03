const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    res.send("Connection request sent successfully");
  } catch (error) {
    res.status(400).send("Error sending connection request: " + error.message);
  }
});

module.exports = requestRouter;
