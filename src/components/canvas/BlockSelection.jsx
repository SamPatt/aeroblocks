import React from 'react';
import { useDrag } from 'react-dnd';
import './BlockSelection.css';

const RenderBlock = ({ block }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: block.type,
    item: { id: block.id, type: block.type, name: block.name },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`main-block ${isDragging ? 'dragging' : ''}`}>
      <div className={block.type.toLowerCase()}>{block.name}</div>
  </div>

  );

  
};

const BlockSelection = ({ blocks }) => {
  const unplacedBlocks = blocks.filter(block => !block.position || (block.position.x === null && block.position.y === null));

  return (
    <div className="block-selection">
      {unplacedBlocks.map((block) => <RenderBlock key={block.id} block={block} />)}
    </div>
  );
};

export default BlockSelection;

