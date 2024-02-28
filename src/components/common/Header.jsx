import React, { useState, useEffect } from 'react';
import './Header.css';
import orbImage from '../../assets/orb.png';
import { useNavigate } from 'react-router-dom';
import { useCanvas } from '../../context/CanvasContext';
import Modal from './Modal';

const Header = ({ showOptions }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [canvasName, setCanvasName] = useState('');
  const { canvasData, setCanvasData, saveCanvas } = useCanvas();
  const navigate = useNavigate();

  const handleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    setCanvasName(canvasData.name);
  }, [canvasData.name]);

  const onLoadCanvas = () => {
    setCanvasData({});
    navigate('/canvas-selection');
  }

  const onNewCanvas = () => {
    setCanvasData({});
    navigate('/code-upload');
  }

  const handleSave = (name) => {
    saveCanvas(name, canvasData);
    setShowSaveModal(false);
  };

  const handleSaveCanvas = () => {
    setShowDropdown(false);
    setShowSaveModal(true);
  };

  const handleLoadCanvas = () => {
    setShowDropdown(false);
    onLoadCanvas();
  };

  const handleNewCanvas = () => {
    setShowDropdown(false);
    onNewCanvas();
  };

  const handleLogOut = () => {
    setShowDropdown(false);
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <>
      <div className="header">
        <h1>Aeroblocks</h1>
        {showOptions && (
          <div className="orb-container" onClick={handleDropdown}>
            <img src={orbImage} alt="Orb" className="orb" />
            {showDropdown && (
              <div className="dropdown">
                <button onClick={handleSaveCanvas}>Save Canvas</button>
                <button onClick={handleLoadCanvas}>Load Canvas</button>
                <button onClick={handleNewCanvas}>New Canvas</button>
                <button onClick={handleLogOut}>Log Out</button>
              </div>
            )}
          </div>
        )}
      </div>
      {showSaveModal && (
        <Modal onClose={() => setShowSaveModal(false)} title="Save Canvas">
        <input
          type="text"
          placeholder="Enter canvas name"
          value={canvasName}
          onChange={(e) => setCanvasName(e.target.value)}
        />
        <button onClick={() => handleSave(canvasName)}>Save</button>
      </Modal>
      )}
    </>
  );
};

export default Header;
