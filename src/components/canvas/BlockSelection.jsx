import React from "react";
import { useDrag } from "react-dnd";
import "./BlockSelection.css";

/**
 * This component, BlockSelection, serves as a toolbox allowing users to view and select different types of blocks 
 * (e.g., variables, outputs) that are not yet placed on a canvas. Each block type, along with its name and optionally 
 * its value, is rendered using the RenderBlock component. The RenderBlock component utilizes the useDrag hook from 
 * react-dnd to enable drag-and-drop functionality, allowing blocks to be dragged from the toolbox onto the canvas.
 * 
 * The RenderBlock component receives a block object as a prop, which contains details such as the block's id, type, 
 * name, and value. It uses these details to display the block within a div element. The block's type determines its 
 * appearance and behavior, including whether its value is displayed. The useDrag hook is configured with the block's 
 * type, id, and name to manage its drag state and to provide visual feedback (e.g., changing the block's class to 
 * "dragging" when it is being dragged).
 * 
 * The BlockSelection component filters the blocks to display only those that have not been placed on the canvas yet 
 * (determined by the absence of a position or having null coordinates). It then maps these unplaced blocks to 
 * RenderBlock components, which are rendered within a div container labeled "Toolbox", allowing users to see and 
 * interact with available blocks for drag-and-drop operations.
 */

// useDrag hook from react-dnd to enable drag-and-drop functionality

const RenderBlock = ({ block }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: block.type,
    item: { id: block.id, type: block.type, name: block.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`block-block ${block.type.toLowerCase()} ${
        isDragging ? "dragging" : ""
      }`}
    >
      <div className="block-header">
        <span className="block-name">{block.name}</span>
        <span className="block-type">{block.type}</span>
      </div>
      <div className="block-body">
        {["variable", "output"].includes(block.type.toLowerCase()) && (
          <div className="block-value">
            {block.value !== null && block.value !== undefined
              ? block.value.toString()
              : ""}
          </div>
        )}
      </div>
    </div>
  );
};

// Will only display blocks without positions
const BlockSelection = ({ blocks }) => {
  const unplacedBlocks = blocks.filter(
    (block) =>
      !block.position ||
      (block.position.x === null && block.position.y === null)
  );

  return (
    <div className="block-selection">
      <h2>Toolbox</h2>
      {unplacedBlocks.map((block) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </div>
  );
};

export default BlockSelection;
