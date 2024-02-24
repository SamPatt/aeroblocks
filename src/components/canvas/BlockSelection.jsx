import React from 'react';
import { useDrag } from 'react-dnd';

const BlockSelection = ({ blocks }) => {
  
  const unplacedBlocks = blocks.filter(block => block.position && block.position.x === null && block.position.y === null);
  
  console.log('Unplaced Blocks:', unplacedBlocks);

  return unplacedBlocks.map((block, index) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: block.type,
      item: { id: block.id },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    console.log(`Block ${index} details:`, block);

    return (
      <div key={block.id} ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>

        <p>{block.id}</p>
      </div>
    );
  });
};

export default BlockSelection;
