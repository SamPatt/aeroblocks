import React from 'react';
import { useDrop } from 'react-dnd';
import { useCanvas } from '../../context/CanvasContext';
import CanvasBlock from './CanvasBlock';

const GridCell = ({ x, y }) => {
    const { canvasData, updateBlockPosition } = useCanvas();
    const [, drop] = useDrop({
      accept: ['FUNCTION', 'VARIABLE', 'LOOP', 'CONDITIONAL'],
      drop: (item) => updateBlockPosition(item.id, x, y),
    });
  
    const blockId = canvasData.grid[y][x];
    const block = canvasData.blocks.find((b) => b.id === blockId);
  
    return (
      <div ref={drop} className="grid-cell" style={{ width: '200px', height: '100px', border: '1px solid black' }}>
        {block && <CanvasBlock block={block} onMoveBlock={updateBlockPosition} />}
      </div>
    );
  };
  
  export default GridCell;
  