import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/clubs">Clubs</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/about">About Us</Link></li>
    </>
  );

  return (
    <>
      <div
        className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 bg-cyan-200 ${sticky ? "sticky-navbar shadow-md bg-red-400 duration-300 transition-all ease-in-out" : ""}`}
      >
        <div className="navbar flex justify-between items-center gap-1">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content text-xl bg-base-100 gap-2 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
              >
                {navItems}
              </ul>
            </div>
            <Link to="/" className="text-3xl font-bold cursor-pointer ml-10 font-poppins hover:text-blue-600">Clubs@viit</Link>
          </div>

          <div className="navbar-center hidden lg:flex font-semibold">
            <ul className="menu menu-horizontal px-3 gap-4 font-semibold font-sans ml-10">
              {navItems}
            </ul>
          </div>

          <div className="dropdown dropdown-end mr-10">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <Link to="/signin" className="justify-between text-white hover:text-black hover:shadow-lg transition duration-300">
                  Sign In
                </Link>
              </li>
              <li><Link to="/profile" className="text-white hover:text-black hover:shadow-lg transition duration-300">Edit Profile</Link></li>
              <li><Link to="/logout" className="text-white hover:text-black hover:shadow-lg transition duration-300">Logout</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
