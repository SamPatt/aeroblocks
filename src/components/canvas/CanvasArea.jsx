import React from 'react';
import { useDrop } from 'react-dnd';
import { useCanvas } from '../../context/CanvasContext';
import './CanvasArea.css';

const CanvasArea = ({ onDropBlock }) => {
    const { canvasData } = useCanvas();
    const [, drop] = useDrop(() => ({
        accept: ['FUNCTION', 'VARIABLE', 'LOOP', 'CONDITIONAL'],
        drop: (item, monitor) => {
          const clientOffset = monitor.getClientOffset(); 
          if (clientOffset) {
            onDropBlock(item.id, clientOffset.x, clientOffset.y);
            console.log( "canvasData:", canvasData)
         
          }
        },
      }));

  return <div ref={drop} className="canvas-area">
    {canvasData.data.blocks
        .filter(block => block.position && block.position.x != null && block.position.y != null)
        .map(block => (
          <div
            key={block.id || block.test}
            className="canvasblock"
            style={{ left: `${block.position.x}px`, top: `${block.position.y}px` }} // Inline styles for positioning
          >
            {block.type === 'CONDITIONAL' ? block.test : block.id}
            </div>
        ))}
  </div>;
};

export default CanvasArea;