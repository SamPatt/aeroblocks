import React, { useState, useEffect } from 'react';
import { useCanvas } from '../context/CanvasContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BlockSelection from '../components/canvas/BlockSelection';
import CanvasArea from '../components/canvas/CanvasArea';
import './CanvasPage.css';

const CanvasPage = () => {
  const { canvasData } = useCanvas();
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    
    if (canvasData && canvasData.data && canvasData.data.blocks) {
      setBlocks(canvasData.data.blocks);
      console.log('Canvas data loaded:', canvasData.data.blocks);
    }
  }, [canvasData]); 

  const handleDropBlock = (id, x, y) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === id) {
          return { ...block, position: { x, y } };
        }
        return block;
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="canvas-page-container">
        {blocks.length === 0 ? (
          <div>Loading...</div> 
        ) : (
          <>
            <BlockSelection blocks={blocks} />
            <CanvasArea
              blocks={blocks.filter(block => block.position && block.position.x != null && block.position.y != null)}
              onDropBlock={handleDropBlock}
            />
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default CanvasPage;
