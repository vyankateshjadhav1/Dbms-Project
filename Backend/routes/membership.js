const express = require('express');
const router = express.Router();
const Membership = require('../models/Membership'); // Import the Membership model
const User = require('../models/User'); // Import the User model
const Club = require('../models/Club'); // Import the Club model

// Create a new membership (Join a club)
router.post('/', async (req, res) => {
    const { user_id, club_id } = req.body;

    try {
        // Verify if the user_id corresponds to a valid user
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Verify if the club_id corresponds to a valid club
        const club = await Club.findById(club_id);
        if (!club) {
            return res.status(400).json({ message: 'Invalid club ID' });
        }

        // Check if the user is already a member of the club
        const existingMembership = await Membership.findOne({ user_id, club_id });
        if (existingMembership) {
            return res.status(400).json({ message: 'User is already a member of this club' });
        }

        const newMembership = new Membership({
            user_id,
            club_id,
        });

        const savedMembership = await newMembership.save();
        res.status(201).json(savedMembership); // Respond with the created membership
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all memberships
router.get('/', async (req, res) => {
    try {
        const memberships = await Membership.find()
            .populate('user_id', 'name email') // Optional: populate user details
            .populate('club_id', 'name description'); // Optional: populate club details
        res.json(memberships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific membership by ID
router.get('/:id', async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id)
            .populate('user_id', 'name email')
            .populate('club_id', 'name description');
        if (!membership) return res.status(404).json({ message: 'Membership not found' });
        res.json(membership);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a membership (Change club or user)
router.put('/:id', async (req, res) => {
    const { user_id, club_id } = req.body;

    try {
        // Verify if the user_id corresponds to a valid user
        if (user_id) {
            const user = await User.findById(user_id);
            if (!user) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
        }

        // Verify if the club_id corresponds to a valid club
        if (club_id) {
            const club = await Club.findById(club_id);
            if (!club) {
                return res.status(400).json({ message: 'Invalid club ID' });
            }
        }

        const updatedMembership = await Membership.findByIdAndUpdate(
            req.params.id,
            { user_id, club_id },
            { new: true, runValidators: true }
        );

        if (!updatedMembership) return res.status(404).json({ message: 'Membership not found' });
        res.json(updatedMembership);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a membership (Leave a club)
router.delete('/:id', async (req, res) => {
    try {
        const deletedMembership = await Membership.findByIdAndDelete(req.params.id);
        if (!deletedMembership) return res.status(404).json({ message: 'Membership not found' });
        res.json({ message: 'Membership deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
