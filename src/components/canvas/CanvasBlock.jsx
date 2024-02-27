import React from "react";
import { useDrag } from "react-dnd";
import "./CanvasBlock.css";

const blockTypeColors = {
  function: "orange",
  input: "green",
  output: "blue",
  variable: "purple",
};

const CanvasBlock = ({ block, onMoveBlock, grid }) => {
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

  const headerColor = blockTypeColors[block.type.toLowerCase()] || "grey";

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

  const gridRowEnd =
    block.type.toLowerCase() === "function"
      ? block.position.y + 3
      : block.position.y + 2;

  return (
    <div
      ref={drag}
      className={`canvas-block ${block.type.toLowerCase()} ${
        isDragging ? "dragging" : ""
      }`}
      style={{
        gridColumnStart: block.position.x + 1,
        gridRowStart: block.position.y + 1,
        gridRowEnd: gridRowEnd,
      }}
    >
      <div className="block-header" style={{ backgroundColor: headerColor }}>
        <span className="block-name">{block.name}</span>
        <span className="block-type">{block.type}</span>
      </div>
      <div
        className={`block-body ${connectionClasses[block.type.toLowerCase()]}`}
      >
        <div className="connectors">
          {["output", "function", "input"].includes(
            block.type.toLowerCase()
          ) && (
            <div
              className={`input-connector ${
                isConnected(block.position, "left") ? "connected" : ""
              }`}
            ></div>
          )}
          {["function", "input", "output"].includes(
            block.type.toLowerCase()
          ) && (
            <div
              className={`output-connector ${
                isConnected(block.position, "right") ? "connected" : ""
              }`}
            ></div>
          )}
          {["function", "output", "input"].includes(
            block.type.toLowerCase()
          ) && (
            <div
              className={`up-connector ${
                isConnected(block.position, "up") ? "connected" : ""
              }`}
            ></div>
          )}
          {["function", "input", "output"].includes(
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
              {block.value !== null && block.value !== undefined
                ? block.value.toString()
                : " "}
            </div>
          )}
      </div>
    </div>
  );
};

export default CanvasBlock;
