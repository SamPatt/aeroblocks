import React from 'react';
import { useDrag } from 'react-dnd';

const CanvasBlock = ({ block, onMoveBlock }) => {
  const [{ isDragging }, drag] = useDrag({
    type: block.type,
    item: { id: block.id, type: block.type, name: block.name },
    end: (item, monitor) => {
      const result = monitor.getDropResult();
      if (result && item.id && result.x !== undefined && result.y !== undefined) {
        onMoveBlock(item.id, result.x, result.y);
      }
    },
  });

  const renderIOBlocks = (block) => {
    return (
      <>
        {block.inputs?.map((input) => (
          <div key={input.id} className="io-block input-block">
            {input.name}
          </div>
        ))}
        <div className="main-block">{block.name}</div>
        {block.outputs?.map((output) => (
          <div key={output.id} className="io-block output-block">
            {output.name}
          </div>
        ))}
      </>
    );
  };

  return (
    <div
      ref={drag}
      className={`canvas-block ${block.type.toLowerCase()} ${isDragging ? 'dragging' : ''}`}
      style={{
        gridColumnStart: block.position.x + 1,
        gridRowStart: block.position.y + 1,
      }}
    >
      <div className="block-content">
        {renderIOBlocks(block)}
      </div>
    </div>
  );
};

export default CanvasBlock;
