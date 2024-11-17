import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar.js';
import Home from './pages/Home.js';
import FoodSearchPage from './pages/FoodSearchPage.js';
import FoodResultsIngredientsPage from './pages/FoodResultsIngredientsPage.js';
import FoodSearchIngredientsPage from './pages/FoodSearchIngredientsPage.js';
import FoodResultPage from './pages/FoodResultPage.js';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food-menu" element={<FoodSearchPage />} />
        <Route path="/recipe/:foodId" element={<FoodResultPage />} />
        <Route path="/food-menu-ingredients" element={<FoodSearchIngredientsPage />} />
        <Route path="/recipe-with-ingredients/:foodId" element={<FoodResultsIngredientsPage />} />
      </Routes>
    </Router>
  )
}

export default App
