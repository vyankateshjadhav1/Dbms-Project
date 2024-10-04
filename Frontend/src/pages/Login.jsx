import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', formData);
      console.log(response.data);
      
      // Check if the token exists in the response
      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        // Clear the form
        setFormData({ username: '', password: '' });
        // Redirect to dashboard
        navigate('/dashboard'); // Use navigate for redirection
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setMessage(error.response?.data.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-yellow-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        {message && (
          <div className={`mb-4 text-center ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username} // Bind the value for controlled component
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password} // Bind the value for controlled component
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? 
          <a href="/signup" className="text-green-600 hover:text-green-800 font-semibold"> Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
