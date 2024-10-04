import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Application = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    skills: [],
    prn: '',
    email: '',
    club: '',
    domain: '',
  });

  const [clubs, setClubs] = useState([]);
  const [domains, setDomains] = useState([]);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubsResponse = await axios.get('http://localhost:3000/api/clubs');
        const domainsResponse = await axios.get('http://localhost:3000/api/domains');
        setClubs(clubsResponse.data);
        setDomains(domainsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      if (formData.domain) {
        try {
          const response = await axios.get(`http://localhost:3000/api/skills?domain=${formData.domain}`);
          setSkills(response.data);
        } catch (error) {
          console.error('Error fetching skills:', error);
          setError('Error fetching skills. Please try again.');
        }
      }
    };
    fetchSkills();
  }, [formData.domain]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillChange = (skillId) => {
    setFormData((prevData) => {
      const { skills } = prevData;
      if (skills.includes(skillId)) {
        return { ...prevData, skills: skills.filter((id) => id !== skillId) };
      } else {
        return { ...prevData, skills: [...skills, skillId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/applications', formData);
      setSuccessMessage('Application submitted successfully!');
      setError('');
      setFormData({
        name: '',
        phone: '',
        skills: [],
        prn: '',
        email: '',
        club: '',
        domain: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setError('Error submitting application. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <Navbar />
      <main className="bg-gray-100 min-h-screen flex flex-col items-center p-10">
        <h2 className="text-4xl font-bold mb-4">Application Form</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded shadow-md">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Phone Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* PRN Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prn">
              PRN
            </label>
            <input
              type="text"
              id="prn"
              name="prn"
              value={formData.prn}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Update club dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="club">
              Club
            </label>
            <select
              id="club"
              name="club"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.club}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a Club</option>
              {clubs.map((club) => (
                <option key={club._id} value={club._id}>{club.name}</option>
              ))}
            </select>
          </div>
          {/* Update domain dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domain">
              Domain
            </label>
            <select
              id="domain"
              name="domain"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.domain}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a Domain</option>
              {domains.map((domain) => (
                <option key={domain._id} value={domain._id}>{domain.name}</option>
              ))}
            </select>
          </div>
          {/* Update skills checkboxes */}
          {formData.domain && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Skills
              </label>
              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill) => (
                  <label key={skill._id} className="flex items-center">
                    <input
                      type="checkbox"
                      value={skill._id}
                      checked={formData.skills.includes(skill._id)}
                      onChange={() => handleSkillChange(skill._id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">{skill.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Application
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Application;
