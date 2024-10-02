import React, { useState } from 'react';
import Navbar2 from './Navbar2'; // Assuming you're using the Navbar2 component for navigation

const SupervisorDashboard = () => {
  // State for managing upcoming events for the club
  const [events, setEvents] = useState([
    { id: 1, name: 'Coding Hackathon', date: '2024-10-15' },
    { id: 2, name: 'Robotics Workshop', date: '2024-10-25' },
  ]);

  // State for managing applications received from the main portal
  const [applications] = useState([
    { id: 1, name: 'John Doe', club: 'Coding Club' },
    { id: 2, name: 'Jane Smith', club: 'Robotics Club' },
  ]);

  // State for managing new event input and edit mode
  const [newEvent, setNewEvent] = useState({ id: null, name: '', date: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Handle event addition or update
  const handleAddOrUpdateEvent = () => {
    if (newEvent.name.trim() === '' || newEvent.date.trim() === '') {
      alert('Event name and date cannot be empty');
      return;
    }

    if (isEditing) {
      setEvents(events.map(event => (event.id === newEvent.id ? newEvent : event)));
      setIsEditing(false); // Reset edit mode
    } else {
      const newId = events.length ? events[events.length - 1].id + 1 : 1;
      setEvents([...events, { id: newId, name: newEvent.name, date: newEvent.date }]);
    }

    setNewEvent({ id: null, name: '', date: '' }); // Clear the input fields
  };

  // Handle editing an existing event
  const handleEditEvent = (event) => {
    setNewEvent(event);
    setIsEditing(true);
  };

  // Handle deleting an event
  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
  };

  return (
    <>
      <Navbar2 />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Supervisor Dashboard - Manage Events and Applications</h2>

        {/* Section for adding new events */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Event' : 'Announce Upcoming Event'}</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="w-full p-3 border rounded-md"
            />
            <button
              onClick={handleAddOrUpdateEvent}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              {isEditing ? 'Update Event' : 'Add Event'}
            </button>
          </div>
        </div>

        {/* List of upcoming events */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Event Name</th>
                <th className="py-2 px-4 border-b">Event Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="py-2 px-4 border-b text-center">{event.id}</td>
                  <td className="py-2 px-4 border-b">{event.name}</td>
                  <td className="py-2 px-4 border-b">{event.date}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* List of applications received */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Applications Received</h3>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Applicant Name</th>
                <th className="py-2 px-4 border-b">Club</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td className="py-2 px-4 border-b text-center">{application.id}</td>
                  <td className="py-2 px-4 border-b">{application.name}</td>
                  <td className="py-2 px-4 border-b">{application.club}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SupervisorDashboard;
