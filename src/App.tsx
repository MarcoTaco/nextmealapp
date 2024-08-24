import React from 'react';
import './App.css'
import NavBar from './components/NavBar.js';
import Home from './pages/Home.js';
import FoodSearchPage from './pages/FoodSearchPage.js';
// import SpoonacularCall from './services/SpoonacularCall.js';

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <FoodSearchPage />
    </>
  )
}

export default App
