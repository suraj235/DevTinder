const express = require('express');
const app = express();
const {adminAuth} = require('./middlewares/auth');

// replaced app.use() with app.get() for specific routes.
// app.use() is for all routes.
// + indicates the particular character or string can be repeated as many times as needed.
// ? conditional, meaning the preceding character or group is optional.
// * indicates the preceding character or group can be repeated as many times as needed.
// handling routes with next().
// Middleware functions can be used to handle requests before they reach the route handler.

app.get('/', (req, res) => {
  res.send('Hello from DevTinder Homepage!');
});

app.get("/suru", (req, res, next) => {
  next();
  res.send('Hello from Suru!');
});

app.get("/suru", (req, res, next) => {
  res.send('Hello from Suru2!');
});

// Auth  Middleware for All Requests
app.use('/admin', adminAuth);

app.get('/admin/getAllUsers', (req, res) => {
  res.send('Hello from Admin Get All Users!');
});

app.get('/admin/getUser', (req, res) => {
  // Logic to check authentication and authorization
  res.send('Hello from Admin Get User of ID 1!');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});