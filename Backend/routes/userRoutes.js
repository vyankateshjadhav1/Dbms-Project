const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

// User signup route
router.post('/signup', userController.signup);

// User login route
router.post('/login', userController.login);

router.get('/me', authenticateToken, userController.getUser);
module.exports = router;
