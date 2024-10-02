import React from 'react';
import Navbar2 from './Navbar2';

const teamMembers = [
  {
    name: 'Vyankatesh Jadhav',
    email: 'jadhavvyankatesh8@gmail.com',
    prn: '22311422',
    role: 'Team Leader',
  },
  {
    name: 'Shridhar Gore',
    email: 'shridhar@example.com',
    prn: '22311423',
    role: 'Member',
  },
  {
    name: 'Harsh Jaisingpure',
    email: 'harsh@example.com',
    prn: '22311424',
    role: 'Member',
  },
];

function AboutUs() {
  return (
    <>
      <Navbar2 />
      <div className="container mx-auto my-16 px-4"> {/* Increased margin to shift down */}
        <h1 className="text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          About Us
        </h1>

        <p className="text-center text-lg text-gray-700 mb-8">
          We are a passionate team dedicated to bringing creative solutions to our community. 
          Meet our talented members below!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-2 text-center text-blue-600">
                {member.name} {member.role === 'Team Leader' && <span className="text-sm text-green-500">(Team Leader)</span>}
              </h2>
              <p className="text-gray-700 mb-1"><strong>Email:</strong> {member.email}</p>
              <p className="text-gray-700"><strong>PRN:</strong> {member.prn}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AboutUs;
