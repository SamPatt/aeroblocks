import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CanvasPage from './pages/CanvasPage';
import CanvasSelection from './components/canvas/CanvasSelection';
import CodeUploadForm from './components/canvas/CodeUploadForm';
import Header from './components/common/Header';
import { AuthProvider } from './context/AuthContext';
import { CanvasProvider } from './context/CanvasContext';
import { useLocation } from 'react-router-dom';

const HeaderWithLocation = () => {
  const location = useLocation();
  const showOptions = location.pathname === '/canvas';
  return <Header showOptions={showOptions} />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <CanvasProvider>
            <HeaderWithLocation />
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
