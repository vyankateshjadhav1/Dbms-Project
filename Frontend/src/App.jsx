
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home/Home';
import Clubs from './Components/Clubs';
import ClubDetails from './Components/ClubDetails';  
import Signup from './Components/Signup';
import AboutUs from './Components/AboutUs';
import AdminDashboard from './Components/AdminDashboard';
import SupervisorDashboard from './Components/SupervisorDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:id" element={<ClubDetails />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs  />}/>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/super" element={<SupervisorDashboard />} />
      </Routes>
    </>
  );
}

export default App;
