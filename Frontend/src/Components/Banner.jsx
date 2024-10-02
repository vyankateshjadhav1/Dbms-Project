import React from 'react';
import bannerImage from '/images/Club.jpg'; // Replace with your image path

const Banner = () => {
  return (
    <div className="relative mb-0"> {/* Removed margin-bottom */}
      {/* Background Image */}
      <img 
        src={bannerImage} 
        alt="Clubs at VIIT" 
        className="w-full h-96 object-cover" 
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent"></div>

      {/* Content */}
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row py-10 relative z-10 text-white"> {/* Added padding to control vertical spacing */}
        <div className="space-y-5"> {/* Increased spacing */}
          <h1 className="text-6xl font-bold mt-0"> {/* Increased heading size */}
            <span className="text-red-500">Why Clubs@VIIT?</span>
          </h1>
          <p className="text-2xl text-gray-800 leading-relaxed"> {/* Increased paragraph size */}
            Clubs@VIIT serves as a one-stop portal for students to explore and join the diverse clubs available at our college. Whether you are passionate about technology, arts, sports, or social causes, Clubs@VIIT connects you with like-minded peers and provides easy access to application forms for all the clubs. By centralizing the application process, the portal simplifies the experience of discovering and engaging with the various student communities on campus. It's an essential resource for anyone looking to enhance their college experience through extracurricular activities, fostering personal growth, skill development, and lasting friendships.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
