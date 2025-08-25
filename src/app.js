const express = require('express');
const app = express();
const connectDB = require('./config/database');

connectDB().then(() => {
  console.log('Database connected successfully');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});