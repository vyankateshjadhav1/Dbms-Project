const Domain = require('../models/Domain');

// Get all domains
exports.getAllDomains = async (req, res) => {
  try {
    const domains = await Domain.find();
    res.json(domains);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching domains', error: error.message });
  }
};

// Get a single domain by ID
exports.getDomainById = async (req, res) => {
  try {
    const domain = await Domain.findById(req.params.id);
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.json(domain);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching domain', error: error.message });
  }
};

// Create a new domain
exports.createDomain = async (req, res) => {
  try {
    const newDomain = new Domain(req.body);
    const savedDomain = await newDomain.save();
    res.status(201).json(savedDomain);
  } catch (error) {
    res.status(400).json({ message: 'Error creating domain', error: error.message });
  }
};

// Update a domain by ID
exports.updateDomain = async (req, res) => {
  try {
    const updatedDomain = await Domain.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedDomain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.json(updatedDomain);
  } catch (error) {
    res.status(400).json({ message: 'Error updating domain', error: error.message });
  }
};

// Delete a domain by ID
exports.deleteDomain = async (req, res) => {
  try {
    const deletedDomain = await Domain.findByIdAndDelete(req.params.id);
    if (!deletedDomain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.json({ message: 'Domain deleted successfully', domain: deletedDomain });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting domain', error: error.message });
  }
};
