import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { canvasService } from '../../services/canvasService';
import './CanvasSelection.css';
import LoadingSpinner from './LoadingSpinner';
import { useCanvas } from '../../context/CanvasContext';

const CanvasSelection = () => {
  const navigate = useNavigate();
  const [canvases, setCanvases] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const { loadCanvas } = useCanvas();
  const { canvasData } = useCanvas();

  useEffect(() => {
    const fetchCanvases = async () => {
      try {
        const loadedCanvases = await canvasService.loadCanvases();
        console.log('Loaded canvases:', loadedCanvases);
        setIsLoading(false); 
        if (loadedCanvases.length === 0) {
          navigate('/code-upload');
        } else {
          setCanvases(loadedCanvases);
        }
      } catch (error) {
        console.error('Failed to fetch canvases:', error);
        setIsLoading(false);
        navigate('/code-upload');
      }
    };

    fetchCanvases();
  }, [navigate]);

    const handleSelectCanvas = (canvas) => {
        loadCanvas(canvas);
        navigate('/canvas');
    }

  if (isLoading) {
    return <LoadingSpinner />; 
  }

  return (
    <div className="canvas-selection-container">
      <h2>Select a Canvas</h2>
      {canvases.map((canvas) => (
        <div key={canvas._id} className="canvas-card" onClick={() => handleSelectCanvas(canvas)}>
          <h3>{canvas.name}</h3>
          <p>Blocks: {canvas.data.blocks.length}</p>
          <p>Last Saved: {new Date(canvas.updated_at).toLocaleString()}</p>
        </div>
      ))}
      <button className="upload-code-btn" onClick={() => navigate('/code-upload')}>
        Upload New Code
      </button>
    </div>
  );
};

export default CanvasSelection;
