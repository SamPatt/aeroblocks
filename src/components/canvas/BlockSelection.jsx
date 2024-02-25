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

  const renderIOBlocks = (block) => {
    return (
      <>
        {block.inputs?.map(input => (
          <div key={input.id} className="io-block input-block">{input.name}</div>
        ))}
        <div className="main-block">{block.name}</div>
        {block.outputs?.map(output => (
          <div key={output.id} className="io-block output-block">{output.name}</div>
        ))}
      </>
    );
  };

  return (
    <div ref={drag} className={`block ${block.type.toLowerCase()} ${isDragging ? 'dragging' : ''}`}>
      <div className="block-content">
        {renderIOBlocks(block)}
      </div>
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
