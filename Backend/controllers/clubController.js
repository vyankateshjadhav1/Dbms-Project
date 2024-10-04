const Club = require('../models/Club');

// Get all clubs
exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clubs', error: error.message });
  }
};

// Get a single club by ID
exports.getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching club', error: error.message });
  }
};

// Create a new club
exports.createClub = async (req, res) => {
  try {
    const newClub = new Club(req.body);
    const savedClub = await newClub.save();
    res.status(201).json(savedClub);
  } catch (error) {
    res.status(400).json({ message: 'Error creating club', error: error.message });
  }
};

// Update a club by ID
exports.updateClub = async (req, res) => {
  try {
    const updatedClub = await Club.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedClub) {
      return res.status(404).json({ message: 'Club not found' });
    }
    res.json(updatedClub);
  } catch (error) {
    res.status(400).json({ message: 'Error updating club', error: error.message });
  }
};

// Delete a club by ID
exports.deleteClub = async (req, res) => {
  try {
    const deletedClub = await Club.findByIdAndDelete(req.params.id);
    if (!deletedClub) {
      return res.status(404).json({ message: 'Club not found' });
    }
    res.json({ message: 'Club deleted successfully', club: deletedClub });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting club', error: error.message });
  }
};
