const express = require('express');
const app = express();

// replaced app.use() with app.get() for specific routes.
// app.use() is for all routes.

app.get('/suru', (req, res) => {
  res.send('Hello from Suru!');
});

app.get('/', (req, res) => {
  res.send('Hello from DevTinder Homepage!');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});