import React, { useState } from 'react';
import './Header.css';
import orbImage from '../../assets/orb.png';

const Header = ({ onSaveCanvas, onLoadCanvas, onNewCanvas, showOptions }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => setShowDropdown(!showDropdown);
  const handleSaveCanvas = () => {
    setShowDropdown(false);
    onSaveCanvas();
  };
  const handleLoadCanvas = () => {
    setShowDropdown(false);
    onLoadCanvas();
  };
  const handleNewCanvas = () => {
    setShowDropdown(false);
    onNewCanvas();
  };
  return (
    <div className="header">
      <h1>Aeroblocks</h1>
      {showOptions && (
        <div className="orb-container" onClick={() => setShowDropdown(!showDropdown)}>
          <img src={orbImage} alt="Orb" className="orb" />
          {showDropdown && (
            <div className="dropdown">
              <button onClick={handleSaveCanvas}>Save Canvas</button>
            <button onClick={handleLoadCanvas}>Load Canvas</button>
            <button onClick={handleNewCanvas}>New Canvas</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
