import React from 'react';
import './App.css'
import NavBar from './components/NavBar.js';
import Home from './pages/Home.js';
import SpoonacularCall from './services/SpoonacularCall.tsx';

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <SpoonacularCall />
    </>
  )
}

export default App
