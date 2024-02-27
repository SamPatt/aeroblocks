import React, { useEffect } from 'react';
import { useCanvas } from '../context/CanvasContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BlockSelection from '../components/canvas/BlockSelection';
import CanvasArea from '../components/canvas/CanvasArea';
import './CanvasPage.css';

const CanvasPage = () => {
  const { canvasData, updateBlockPosition } = useCanvas();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="canvas-page-container">
        <BlockSelection blocks={canvasData.blocks.filter(block => !block.position || (block.position.x === null && block.position.y === null))} />
        <CanvasArea
          blocks={canvasData.blocks.filter(block => block.position && block.position.x != null && block.position.y != null)}
          onDropBlock={updateBlockPosition}
          grid={canvasData.grid}
        />
      </div>
    </DndProvider>
  );
};

export default CanvasPage;
