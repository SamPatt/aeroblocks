import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CanvasPage from './pages/CanvasPage';
import CanvasSelection from './components/canvas/CanvasSelection'
import CodeUploadForm from './components/canvas/CodeUploadForm'
import { AuthProvider } from './context/AuthContext';
import { CanvasProvider } from './context/CanvasContext';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
        <CanvasProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/canvas" element={<CanvasPage />} />
            <Route path="/canvas-selection" element={<CanvasSelection />} />
            <Route path="/code-upload" element={<CodeUploadForm />} />
          </Routes>
        </CanvasProvider>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
