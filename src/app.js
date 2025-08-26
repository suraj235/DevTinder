const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

// Middleware to parse JSON bodies
app.use(express.json());

// Signup route
app.post('/signup', async (req, res) => {
  const user = new User({
    username: req.body.firstName + Math.random().toString(36).substring(2, 5),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    location: req.body.location,
    bio: req.body.bio,
  });

  try {
    await user.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(400).send('Error creating user: ' + error.message);
  }
});

// Get Users route
app.get('/user', async (req, res) => {
  console.log(req.body.email);
  try {
    const users = await User.find({ email: req.body.email });
    if(users.length === 0) {
      return res.status(404).send('No users found with the provided email');
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(500).send('Error fetching users: ' + error.message);
  }
});

// Get Feed
app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({});
    if(users.length === 0) {
      return res.status(404).send('No users found');
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(500).send('Error fetching feed: ' + error.message);
  }
});

// Update User route
app.patch('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ['firstName', 'lastName', 'password', 'age', 'location', 'bio', 'profilePicture', 'skills'];
    const isUpdateAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));
    if(!isUpdateAllowed) {
      res.status(400).send('Invalid updates! Only the following fields can be updated: ' + ALLOWED_UPDATES.join(', '));
    }
    
    const user =  await User.findByIdAndUpdate(userId, data, { runValidators: true, returnDocument: 'after' });
    res.status(200).send("User updated successfully!");
  } catch (error) {
    return res.status(400).send('Error updating user: ' + error.message);
  }
});

// Delete User route
app.delete('/user', async(req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if(!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send("User deleted successfully!");
  } catch (error) {
    return res.status(400).send('Error deleting user: ' + error.message);
  }
})

connectDB().then(() => {
  console.log('Database connected successfully');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});