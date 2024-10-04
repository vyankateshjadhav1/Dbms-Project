import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    club: '', // Added club field
  });

  const [clubs, setClubs] = useState([]); // State for clubs
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch clubs from the server
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/clubs');
        setClubs(response.data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
        setError('Error fetching clubs. Please try again.');
      }
    };

    fetchClubs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/signup', formData);
      console.log(response.data);
      setSuccessMessage('Sign up successful! You can now log in.');
      setError(''); // Clear error message
    } catch (error) {
      console.error('Signup error:', error.response.data);
      setError('Signup failed. Please try again.');
      setSuccessMessage(''); // Clear success message
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        
        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="club" className="block text-gray-700 text-sm font-bold mb-2">Select Club</label>
            <select
              id="club"
              name="club"
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a Club</option>
              {clubs.map((club) => (
                <option key={club._id} value={club._id}>{club.name}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200 ease-in-out transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? 
          <a href="/login" className="text-blue-600 hover:text-blue-800 font-semibold"> Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
