import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DomainManager from '../components/DomainManager';
import SkillManager from '../components/SkillManager';
import ClubManager from '../components/ClubManager';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (!token) {
          throw new Error('No token found, please sign in again.');
        }
        
        const response = await axios.get('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        setError('Failed to load user data: ' + (error.response ? error.response.data.message : error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Display the club name */}
        {user && (
          <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
            <h2 className="text-2xl font-semibold">Welcome, {user.name}</h2>
            <p className="text-gray-700">You are managing: <strong>{user.club?.name}</strong></p>
          </div>
        )}

        <DomainManager />
        <SkillManager />
        <ClubManager />
      </div>
    </div>
  );
};

export default Dashboard;
