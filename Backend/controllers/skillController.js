const Skill = require('../models/Skill');

// Get all skills or skills by domain
exports.getAllSkills = async (req, res) => {
  try {
    const { domain } = req.query;
    const query = domain ? { domain } : {};
    const skills = await Skill.find(query);
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
};

// Get a single skill by ID
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skill', error: error.message });
  }
};

// Create a new skill
exports.createSkill = async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(400).json({ message: 'Error creating skill', error: error.message });
  }
};

// Update a skill by ID
exports.updateSkill = async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(updatedSkill);
  } catch (error) {
    res.status(400).json({ message: 'Error updating skill', error: error.message });
  }
};

// Delete a skill by ID
exports.deleteSkill = async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully', skill: deletedSkill });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill', error: error.message });
  }
};
