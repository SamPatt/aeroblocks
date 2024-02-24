import React from 'react';
import { useDrop } from 'react-dnd';

const CanvasArea = ({ onDropBlock }) => {
  const [, drop] = useDrop(() => ({
    accept: ['FUNCTION', 'VARIABLE', 'LOOP', 'CONDITIONAL'],
    drop: (item, monitor) => {
      const delta = monitor.getSourceClientOffset();
      if (delta) {
        onDropBlock(item.id, delta.x, delta.y); 
      }
    },
  }));

  return <div ref={drop} className="canvas-area"></div>;
};

export default CanvasArea;