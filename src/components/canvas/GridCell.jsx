import React from 'react';
import { useDrop } from 'react-dnd';
import { useCanvas } from '../../context/CanvasContext';
import CanvasBlock from './CanvasBlock';

// Grid cells for the canvas area

const GridCell = ({ x, y }) => {
    const { canvasData, updateBlockPosition } = useCanvas();
    const [, drop] = useDrop({
      accept: ['FUNCTION', 'INPUT', 'OUTPUT', 'OPERATOR', 'VARIABLE', 'CONDITIONAL'],
      drop: (item) => updateBlockPosition(item.id, x, y),
    });
  
    const blockId = canvasData.grid[y][x];
    const block = canvasData.blocks.find((b) => b.id === blockId);
  
    return (
      <div ref={drop} className="grid-cell" style={{ width: '200px', height: '160px', border: '1px solid rgba(39, 203, 50, 0.077)' }}>
        {block && <CanvasBlock block={block} onMoveBlock={updateBlockPosition} grid={canvasData.grid} />}
      </div>
    );
  };
  
  export default GridCell;