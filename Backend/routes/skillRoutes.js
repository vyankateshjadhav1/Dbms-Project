const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// Get all skills or skills by domain
router.get('/', skillController.getAllSkills);

// Get a single skill by ID
router.get('/:id', skillController.getSkillById);

// Create a new skill (admin only)
router.post('/', authenticateToken, isAdmin, skillController.createSkill);

// Update a skill by ID (admin only)
router.put('/:id', authenticateToken, isAdmin, skillController.updateSkill);

// Delete a skill by ID (admin only)
router.delete('/:id', authenticateToken, isAdmin, skillController.deleteSkill);

module.exports = router;
