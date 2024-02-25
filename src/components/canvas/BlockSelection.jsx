import React from 'react';
import { useDrag } from 'react-dnd';
import './BlockSelection.css'; 

const RenderBlock = ({ block, isChild = false }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: block.type, 
    item: { id: block.id || block.test }, 
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={!isChild ? drag : null} 
      className={`block ${block.type.toLowerCase()} ${isDragging ? 'dragging' : ''} ${isChild ? 'child-block' : ''}`}
    >
      <div className="block-header">
        {block.type === 'CONDITIONAL' ? block.test : block.id}
        <span className="block-type">{block.type}</span>
      </div>
      {block.children && <div className="child-container">{block.children.map(child => <RenderBlock key={child.id || child.test} block={child} isChild={true} />)}</div>}
    </div>
  );
};

const BlockSelection = ({ blocks }) => {
  const unplacedBlocks = blocks.filter(block => !block.position || (block.position.x === null && block.position.y === null));

  return (
    <div className="block-selection">
      {unplacedBlocks.map((block) => <RenderBlock key={block.id || block.test} block={block} />)}
    </div>
  );
};

export default BlockSelection;
