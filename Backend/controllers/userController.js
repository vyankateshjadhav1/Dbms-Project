const User = require('../models/User'); // Import User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator'); // Import express-validator for validation

// User login
exports.login = [
  // Validate and sanitize inputs
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expiry time
      );

      // Return token and user info (avoid sending sensitive info)
      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          club: user.club, // Optionally include club if needed
        },
      });
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  },
];

// Get user data
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('club'); 
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json(user); // Return the user data with a 200 status
  } catch (error) {
    console.error('Error fetching user data:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
};

// Additional endpoint for user registration (optional)
exports.register = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, name } = req.body;

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        name,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, username: newUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).json({
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          username: newUser.username,
        },
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  },
];