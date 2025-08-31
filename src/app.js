const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSingnupInput } = require("./helpers/validations");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } =  require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

// Signup route
app.post("/signup", async (req, res) => {
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

// Login route
app.post("/login", async (req, res) => {
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
    const token = await jwt.sign( {_id: user._id}, "DevTinder@2025##", {expiresIn: '1d'} );
    res.cookie("token", token);

    res.status(200).send("Login Successful!");
  } catch (error) {
    res.status(400).send("Error logging in: " + error.message);
  }
});

// Profile route
app.post("/profile", userAuth, (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send("Error fetching profile: " + error.message);
  }
});

// sendConnectionRequest route
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    res.send("Connection request sent successfully");
  } catch (error) {
    res.status(400).send("Error sending connection request: " + error.message);
  }
});


connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
