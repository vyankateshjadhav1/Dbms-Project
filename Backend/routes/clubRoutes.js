const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// Get all clubs
router.get('/', clubController.getAllClubs);

// Get a single club by ID
router.get('/:id', clubController.getClubById);

// Create a new club (admin only)
router.post('/', authenticateToken, isAdmin, clubController.createClub);

// Update a club (admin only)
router.put('/:id', authenticateToken, isAdmin, clubController.updateClub);

// Delete a club (admin only)
router.delete('/:id', authenticateToken, isAdmin, clubController.deleteClub);

module.exports = router;