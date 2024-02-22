import React from 'react';
import { useNavigate } from 'react-router-dom';

const CanvasSelection = () => {
  const navigate = useNavigate();


  const handleSelectCanvas = (canvasId) => {
    console.log('Canvas selected:', canvasId);
  };

  return (
    <div>
      <h2>Select a Canvas</h2>
      <div>
        <button onClick={() => handleSelectCanvas('123')}>Canvas 1</button>
      </div>
      <button onClick={() => navigate('/code-upload')}>Upload New Code</button>
    </div>
  );
};

export default CanvasSelection;
