import React from "react";
import { useDrag } from "react-dnd";
import "./BlockSelection.css";

const blockTypeColors = {
  function: "orange",
  input: "green",
  output: "blue",
  variable: "purple",
};

const RenderBlock = ({ block }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: block.type,
    item: { id: block.id, type: block.type, name: block.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const headerColor = blockTypeColors[block.type.toLowerCase()] || "grey";

  return (
    <div
      ref={drag}
      className={`block-block ${block.type.toLowerCase()} ${
        isDragging ? "dragging" : ""
      }`}
    >
      <div className="block-header" style={{ backgroundColor: headerColor }}>
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

const BlockSelection = ({ blocks }) => {
  const unplacedBlocks = blocks.filter(
    (block) =>
      !block.position ||
      (block.position.x === null && block.position.y === null)
  );

  return (
    <div className="block-selection">
      {unplacedBlocks.map((block) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </div>
  );
};

export default BlockSelection;
