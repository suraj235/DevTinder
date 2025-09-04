const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// Send connection request
requestRouter.post("/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const { status, userId } = req.params;
    const loggedinUserId = req.user._id;

    const allowedStatuses = ["interested", "ignored"];
    if(!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // check if toUserId exists
    const isUserExits = await User.findById(userId);
    if(!isUserExits) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if a request already exists
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        {fromUserId: loggedinUserId, toUserId: userId},
        {fromUserId: userId, toUserId: loggedinUserId}
      ]
    })
    if(existingRequest) {
      return res.status(400).json({ message: "Connection request already exists" });
    }

    const connectionRequest = new ConnectionRequest({
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
