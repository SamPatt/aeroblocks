import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { useCanvas } from "../../context/CanvasContext";
import "./CanvasBlock.css";

const CanvasBlock = ({ block, onMoveBlock, grid }) => {
  const { updateBlockContent } = useCanvas();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(block.value);
  const [{ isDragging }, drag] = useDrag({
    type: block.type,
    item: { id: block.id, type: block.type, name: block.name },
    end: (item, monitor) => {
      const result = monitor.getDropResult();
      if (
        result &&
        item.id &&
        result.x !== undefined &&
        result.y !== undefined
      ) {
        onMoveBlock(item.id, result.x, result.y);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleEditChange = (e) => setEditValue(e.target.value);

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      updateBlockContent(block.id, editValue);
      setIsEditing(false);
    }
  };
  
  const handleBlur = () => {
    updateBlockContent(block.id, editValue);
    setIsEditing(false);
  };
  
// Determines if a block is connected to another block in a given direction

  const isConnected = (position, direction) => {
    const x = position.x;
    const y = position.y;

    switch (direction) {
      case "left":
        return grid[y] && grid[y][x - 1] != null;
      case "right":
        return grid[y] && grid[y][x + 1] != null;
      case "up":
        return grid[y - 1] && grid[y - 1][x] != null;
      case "down":
        return grid[y + 1] && grid[y + 1][x] != null;
      default:
        return false;
    }
  };
// Determines the CSS classes for the block based on its type and connections

  const connectionClasses = {
    input: `${isConnected(block.position, "left") ? "connected-left" : ""} ${
      isConnected(block.position, "right") ? "connected-right" : ""
    } ${isConnected(block.position, "up") ? "connected-up" : ""} ${
      isConnected(block.position, "down") ? "connected-down" : ""
    }`,
    function: `${isConnected(block.position, "left") ? "connected-left" : ""} ${
      isConnected(block.position, "right") ? "connected-right" : ""
    } ${isConnected(block.position, "up") ? "connected-up" : ""} ${
      isConnected(block.position, "down") ? "connected-down" : ""
    }`,
    output: `${isConnected(block.position, "left") ? "connected-left" : ""} ${
      isConnected(block.position, "right") ? "connected-right" : ""
    } ${isConnected(block.position, "up") ? "connected-up" : ""} ${
      isConnected(block.position, "down") ? "connected-down" : ""
    }`,
    variable: `${isConnected(block.position, "left") ? "connected-left" : ""} ${
      isConnected(block.position, "right") ? "connected-right" : ""
    } ${isConnected(block.position, "up") ? "connected-up" : ""} ${
      isConnected(block.position, "down") ? "connected-down" : ""
    }`,
  };

// Renders the block with drag-and-drop functionality, editing capabilities, and connection indicators

  return (
    <div
      ref={drag}
      className={`canvas-block ${block.type.toLowerCase()} ${
        isDragging ? "dragging" : ""
      }`}
    >
      <div className="block-header">
        <span className="block-name">{block.name}</span>
        <span className="block-type">{block.type}</span>
      </div>
      <div
        className={`block-body ${connectionClasses[block.type.toLowerCase()]}`}
      >
        <div className="connectors">
          {["output", "function", "input", "variable"].includes(
            block.type.toLowerCase()
          ) && (
            <div
              className={`input-connector ${
                isConnected(block.position, "left") ? "connected" : ""
              }`}
            ></div>
          )}
          {["function", "input", "output", "variable"].includes(
            block.type.toLowerCase()
          ) && (
            <div
              className={`output-connector ${
                isConnected(block.position, "right") ? "connected" : ""
              }`}
            ></div>
          )}
          {["function", "output", "input", "variable"].includes(
            block.type.toLowerCase()
          ) && (
            <div
              className={`up-connector ${
                isConnected(block.position, "up") ? "connected" : ""
              }`}
            ></div>
          )}
          {["function", "input", "output", "variable"].includes(
            block.type.toLowerCase()
          ) && (
            <div
              className={`down-connector ${
                isConnected(block.position, "down") ? "connected" : ""
              }`}
            ></div>
          )}
        </div>
        {["variable", "output", "function", "input"].includes(block.type.toLowerCase()) && (
        <div className="block-value">
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={handleEditChange}
              onKeyPress={handleEditKeyPress}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <>
              {block.value !== null && block.value !== undefined ? block.value.toString() : " "}
              <span onClick={toggleEdit} className="edit-icon">⚙</span>
            </>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default CanvasBlock;
