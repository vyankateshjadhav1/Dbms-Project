const express = require('express');
const router = express.Router();
const domainController = require('../controllers/domainController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// Get all domains
router.get('/', domainController.getAllDomains);

// Get a single domain by ID
router.get('/:id', domainController.getDomainById);

// Create a new domain (admin only)
router.post('/', authenticateToken, isAdmin, domainController.createDomain);

// Update a domain by ID (admin only)
router.put('/:id', authenticateToken, isAdmin, domainController.updateDomain);

// Delete a domain by ID (admin only)
router.delete('/:id', authenticateToken, isAdmin, domainController.deleteDomain);

module.exports = router;
