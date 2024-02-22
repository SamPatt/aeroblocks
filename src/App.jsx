import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CanvasPage from './pages/CanvasPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/canvas" element={<CanvasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
