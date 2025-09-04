const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");

// Send connection request
requestRouter.post("/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const { status, userId } = req.params;
    const loggedinUserId = req.user._id;

    const connectionRequest = new connectionRequestModel({
      fromUserId: loggedinUserId,
      toUserId: userId,
      status: status,
    });

    await connectionRequest.save();
    res.status(200).json({ message: "Connection request sent successfully", data: connectionRequest });
    
  } catch (error) {
    res.status(400).send("Error sending connection request: " + error.message);
  }
});

module.exports = requestRouter;
