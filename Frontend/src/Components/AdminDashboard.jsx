import React, { useState } from 'react';
import Navbar2 from './Navbar2'; // Assuming you have a Navbar2 component

const AdminDashboard = () => {
  const [clubs, setClubs] = useState([
    { id: 1, name: 'Coding Club' },
    { id: 2, name: 'Robotics Club' },
    { id: 3, name: 'Music Club' },
  ]);

  const [newClub, setNewClub] = useState('');

  const handleAddClub = () => {
    if (newClub.trim() === '') {
      alert('Club name cannot be empty');
      return;
    }

    const newId = clubs.length ? clubs[clubs.length - 1].id + 1 : 1;
    setClubs([...clubs, { id: newId, name: newClub }]);
    setNewClub('');
  };

  const handleDeleteClub = (id) => {
    const updatedClubs = clubs.filter((club) => club.id !== id);
    setClubs(updatedClubs);
  };

  return (
    <>
      <Navbar2 />
      <div className="p-8 font-sans">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Dashboard - Manage Clubs</h2>

        {/* Add New Club */}
        <div className="flex justify-center items-center mb-6">
          <input
            type="text"
            placeholder="Enter club name"
            value={newClub}
            onChange={(e) => setNewClub(e.target.value)}
            className="p-2 w-64 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
          />
          <button
            onClick={handleAddClub}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add Club
          </button>
        </div>

        {/* Clubs List in Table */}
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">ID</th>
              <th className="py-3 px-6 text-center">Club Name</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {clubs.map((club) => (
              <tr key={club.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-center">{club.id}</td>
                <td className="py-3 px-6 text-center">{club.name}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDeleteClub(club.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Log Out Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
