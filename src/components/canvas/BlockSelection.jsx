import React from 'react';
import { useDrag } from 'react-dnd';
import './BlockSelection.css'; 

const RenderBlock = ({ block }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: block.type, 
    item: { id: block.id || block.test }, 
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const blockLabel = block.type === 'CONDITIONAL' ? block.test : block.id;

  return (
    <div ref={drag} className={`block ${isDragging ? 'dragging' : ''}`}>
      
      <p>{blockLabel}</p>
      
      {block.children && block.children.map((child) => <RenderBlock key={child.id || child.test} block={child} />)}
    </div>
  );
};

const BlockSelection = ({ blocks }) => {
  
  const unplacedBlocks = blocks.filter(block => block.position && block.position.x === null && block.position.y === null);

  return (
    <div className="block-selection">
      {unplacedBlocks.map((block) => <RenderBlock key={block.id || block.test} block={block} />)}
    </div>
  );
};

export default BlockSelection;
