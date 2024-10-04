import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState('');
  const [editingSkillId, setEditingSkillId] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await axios.get('http://localhost:3000/api/skills');
      setSkills(response.data);
    };
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkillId) {
        await axios.put(`http://localhost:3000/api/skills/${editingSkillId}`, { name: skillName });
      } else {
        await axios.post('http://localhost:3000/api/skills', { name: skillName });
      }
      setSkillName('');
      setEditingSkillId(null);
      // Refresh skills
      const response = await axios.get('http://localhost:3000/api/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleEdit = (skill) => {
    setSkillName(skill.name);
    setEditingSkillId(skill._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/skills/${id}`);
    setSkills(skills.filter(skill => skill._id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Skills</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          placeholder="Skill Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
          required
        />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          {editingSkillId ? 'Update Skill' : 'Add Skill'}
        </button>
      </form>
      <ul>
        {skills.map((skill) => (
          <li key={skill._id} className="flex justify-between items-center border-b py-2">
            {skill.name}
            <div>
              <button onClick={() => handleEdit(skill)} className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
              <button onClick={() => handleDelete(skill._id)} className="text-red-600 hover:text-red-800">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillManager;
