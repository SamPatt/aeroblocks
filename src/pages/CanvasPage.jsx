import React from 'react';
import { useCanvas } from '../context/CanvasContext';


const CanvasPage = () => {
    const { canvasData } = useCanvas();
    console.log('Canvas Data:', canvasData);
  return (
    <>
      <p>Canvas</p>
    </>
  );
};

export default CanvasPage;