import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClubManager = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const response = await axios.get('http://localhost:3000/api/clubs');
      setClubs(response.data);
    };
    fetchClubs();
  }, []);

  const toggleApplication = async (clubId, isEnabled) => {
    try {
      await axios.put(`http://localhost:3000/api/clubs/${clubId}/toggleApplication`, { isEnabled: !isEnabled });
      setClubs(clubs.map(club => (club._id === clubId ? { ...club, isApplicationEnabled: !isEnabled } : club)));
    } catch (error) {
      console.error('Error toggling application:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Club Applications</h2>
      <ul>
        {clubs.map((club) => (
          <li key={club._id} className="flex justify-between items-center border-b py-2">
            <span>{club.name}</span>
            <button
              onClick={() => toggleApplication(club._id, club.isApplicationEnabled)}
              className={`py-2 px-4 rounded ${club.isApplicationEnabled ? 'bg-red-600' : 'bg-green-600'} text-white`}
            >
              {club.isApplicationEnabled ? 'Disable Application' : 'Enable Application'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClubManager;
