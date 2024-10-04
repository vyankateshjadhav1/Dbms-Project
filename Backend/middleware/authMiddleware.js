const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure to adjust the path according to your project structure

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from header

  if (!token) {
    return res.sendStatus(401); // Unauthorized if no token is present
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    
    // Attach user info to the request
    req.user = user; 
    next(); // Proceed to the next middleware/route handler
  });
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Get user from database using ID from token

    if (!user || !user.isAdmin) {
      return res.sendStatus(403); // Forbidden if user is not found or not an admin
    }

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error('Error checking admin status:', error);
    return res.sendStatus(500); // Internal server error if there's an issue
  }
};

module.exports = { authenticateToken, isAdmin };
