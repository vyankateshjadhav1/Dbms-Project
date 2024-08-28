import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home/Home';
import Clubs from './Components/Clubs';
import ClubDetails from './Components/ClubDetails';  

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:id" element={<ClubDetails />} />  
      </Routes>
    </>
  );
}

export default App;
