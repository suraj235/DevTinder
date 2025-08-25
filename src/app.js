const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

// Middleware to parse JSON bodies
app.use(express.json());

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

connectDB().then(() => {
  console.log('Database connected successfully');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});