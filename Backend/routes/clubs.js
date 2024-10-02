const express = require('express');
const router = express.Router();
const Club = require('../models/Club'); // Import the Club model
const User = require('../models/User'); // Import the User model to verify supervisor
const { protect } = require('../middleware/auth'); // Import the protect middleware

// Create a new club (protected route, supervisors only)
router.post('/', protect, async (req, res) => {
    const { name, description, image_url, supervisor_id } = req.body;

    try {
        // Verify if the supervisor_id corresponds to a valid user with the role "supervisor"
        const supervisor = await User.findById(supervisor_id);
        if (!supervisor || supervisor.role !== 'supervisor') {
            return res.status(400).json({ message: 'Invalid supervisor ID' });
        }

        const newClub = new Club({
            name,
            description,
            image_url,
            supervisor_id,
        });

        const savedClub = await newClub.save();
        res.status(201).json(savedClub); // Respond with the created club
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all clubs (open route)
router.get('/', async (req, res) => {
    try {
        const clubs = await Club.find().populate('supervisor_id', 'name email'); // Optional: populate supervisor details
        res.json(clubs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a club by ID (open route)
router.get('/:id', async (req, res) => {
    try {
        const club = await Club.findById(req.params.id).populate('supervisor_id', 'name email');
        if (!club) return res.status(404).json({ message: 'Club not found' });
        res.json(club);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a club (protected route, supervisors only)
router.put('/:id', protect, async (req, res) => {
    const { name, description, image_url, supervisor_id } = req.body;

    try {
        // Verify if the supervisor_id corresponds to a valid user with the role "supervisor"
        if (supervisor_id) {
            const supervisor = await User.findById(supervisor_id);
            if (!supervisor || supervisor.role !== 'supervisor') {
                return res.status(400).json({ message: 'Invalid supervisor ID' });
            }
        }

        const updatedClub = await Club.findByIdAndUpdate(
            req.params.id,
            { name, description, image_url, supervisor_id },
            { new: true, runValidators: true }
        );

        if (!updatedClub) return res.status(404).json({ message: 'Club not found' });
        res.json(updatedClub);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a club (protected route, supervisors only)
router.delete('/:id', protect, async (req, res) => {
    try {
        const deletedClub = await Club.findByIdAndDelete(req.params.id);
        if (!deletedClub) return res.status(404).json({ message: 'Club not found' });
        res.json({ message: 'Club deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
