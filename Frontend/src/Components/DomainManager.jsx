import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DomainManager = () => {
  const [domains, setDomains] = useState([]);
  const [domainName, setDomainName] = useState('');
  const [editingDomainId, setEditingDomainId] = useState(null);

  useEffect(() => {
    const fetchDomains = async () => {
      const response = await axios.get('http://localhost:3000/api/domains');
      setDomains(response.data);
    };
    fetchDomains();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDomainId) {
        await axios.put(`http://localhost:3000/api/domains/${editingDomainId}`, { name: domainName });
      } else {
        await axios.post('http://localhost:3000/api/domains', { name: domainName });
      }
      setDomainName('');
      setEditingDomainId(null);
      // Refresh domains
      const response = await axios.get('http://localhost:3000/api/domains');
      setDomains(response.data);
    } catch (error) {
      console.error('Error saving domain:', error);
    }
  };

  const handleEdit = (domain) => {
    setDomainName(domain.name);
    setEditingDomainId(domain._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/domains/${id}`);
    setDomains(domains.filter(domain => domain._id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Domains</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
          placeholder="Domain Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
          required
        />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          {editingDomainId ? 'Update Domain' : 'Add Domain'}
        </button>
      </form>
      <ul>
        {domains.map((domain) => (
          <li key={domain._id} className="flex justify-between items-center border-b py-2">
            {domain.name}
            <div>
              <button onClick={() => handleEdit(domain)} className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
              <button onClick={() => handleDelete(domain._id)} className="text-red-600 hover:text-red-800">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DomainManager;
