import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import clubsData from '../../public/list.json';
import Navbar2 from './Navbar2';

function ClubDetails() {
  const { id } = useParams();
  const club = clubsData.find((item) => item.id === parseInt(id));

  // State to control form visibility
  const [showForm, setShowForm] = useState(false);

  // Toggle form visibility
  const handleApplyClick = () => {
    setShowForm(!showForm);
  };

  // Function to close the form
  const closeForm = () => {
    setShowForm(false);
  };

  if (!club) {
    return <p>Club not found!</p>;
  }

  return (
    <>
      <Navbar2 />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        
        {/* Image Section */}
        <div className="order-1 w-full md:w-1/2 mt-10 mr-3 flex justify-center md:justify-start">
          <img
            src={club.image}
            className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
            alt={`${club.name} Club`}
          />
        </div>

        {/* Club Info Section */}
        <div className="order-2 w-full md:w-1/2 mt-12 md:mt-32 mr-10">
          <div className="space-y-11">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              {club.name}
            </h1>

            <p className="text-xl text-gray-700 leading-relaxed">
              Welcome to <span className="font-semibold">{club.name}</span>, your haven for literary exploration! Step into a world where pages come alive and stories transport you to new realms. Embrace the joy of reading with us at <span className="font-semibold">{club.name}</span>, where every book is a gateway to imagination. Happy reading!
            </p>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApplyClick}
            className="btn mt-5 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Apply
          </button>

          {/* Conditionally rendered form */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="relative bg-base-100 p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto max-h-[80vh] overflow-y-auto">
                
                {/* Close (X) button */}
                <button
                  onClick={closeForm}
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-500 font-bold text-2xl"
                >
                  &times;
                </button>

                <h3 className="text-3xl font-bold mb-6 text-center">Apply for {club.name}</h3>

                <form>
                  {/* Name Input */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input input-bordered w-full mt-1"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input input-bordered w-full mt-1"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* PRN Number Input */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold" htmlFor="prn">
                      PRN Number
                    </label>
                    <input
                      type="text"
                      id="prn"
                      className="input input-bordered w-full mt-1"
                      placeholder="Enter your PRN Number"
                    />
                  </div>

                  {/* Interested Domain (Dropdown) */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold" htmlFor="domain">
                      Interested Domain
                    </label>
                    <select
                      id="domain"
                      className="select select-bordered w-full mt-1"
                    >
                      <option value="">Select a domain</option>
                      <option value="event management">Event Management</option>
                      <option value="tech">Tech</option>
                      <option value="finance">Finance</option>
                      <option value="content">Content</option>
                      <option value="social media">Social Media</option>
                    </select>
                  </div>

                  {/* Skills Input */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold" htmlFor="skills">
                      What skills do you have and why do you want to join?
                    </label>
                    <textarea
                      id="skills"
                      className="textarea textarea-bordered w-full mt-1"
                      placeholder="Describe your skills"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-semibold py-2 px-4 rounded-full w-full"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ClubDetails;
