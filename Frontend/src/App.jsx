import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home/Home';
import Clubs from './pages/Clubs';
import ClubDetails from './Components/ClubDetails';
import Login from './pages/Login';  
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:id" element={<ClubDetails />} />
        <Route path="/signin" element={<Login />} /> 
        <Route path="/signup" element={<SignUpPage />} /> 
      </Routes>
    </>
  );
}

export default App;
