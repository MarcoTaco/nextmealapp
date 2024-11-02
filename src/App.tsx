import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar.js';
import Home from './pages/Home.js';
import FoodSearchPage from './pages/FoodSearchPage.js';

import FoodResultPage from './pages/FoodResultPage.js';
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food-menu" element={<FoodSearchPage />} />
        <Route path="/test" element={<FoodResultPage />} />
      </Routes>
    </Router>
  )
}

export default App
