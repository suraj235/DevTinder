const adminAuth = (req, res, next) => {
  console.log("Admin Middleware is running");
  const token = 'suru'; // Simulated token for authentication
  if (token !== 'suru') {
    res.status(403).send('Forbidden: You do not have permission to access this resource.');
  } else {
    next();
  }
};

module.exports = {adminAuth};