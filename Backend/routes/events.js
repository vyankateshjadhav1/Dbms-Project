const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Import the Event model
const Club = require('../models/Club'); // Import the Club model to verify the club

// Create a new event
router.post('/', async (req, res) => {
    const { name, description, date, club_id } = req.body;

    try {
        // Verify if the club_id corresponds to a valid club
        const club = await Club.findById(club_id);
        if (!club) {
            return res.status(400).json({ message: 'Invalid club ID' });
        }

        const newEvent = new Event({
            name,
            description,
            date,
            club_id,
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent); // Respond with the created event
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().populate('club_id', 'name description'); // Optional: populate club details
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get an event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('club_id', 'name description');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an event
router.put('/:id', async (req, res) => {
    const { name, description, date, club_id } = req.body;

    try {
        // Verify if the club_id corresponds to a valid club
        if (club_id) {
            const club = await Club.findById(club_id);
            if (!club) {
                return res.status(400).json({ message: 'Invalid club ID' });
            }
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { name, description, date, club_id },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
