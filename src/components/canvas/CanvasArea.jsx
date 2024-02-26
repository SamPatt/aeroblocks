import React, { useCallback, useState, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { useCanvas } from "../../context/CanvasContext";
import GridCell from "./GridCell";
import CanvasBlock from "./CanvasBlock";
import "./CanvasArea.css";

const maxRows = 2;
const maxColumns = 2;

const CanvasArea = () => {
  const { canvasData, updateBlockPosition } = useCanvas();
  const rows = Array.from({ length: maxRows }, (_, i) => i);
  const columns = Array.from({ length: maxColumns }, (_, i) => i);

  const renderBlocks = useCallback((blocks) => {
    return blocks.map((block) => {
    //   if (block.position.x != null && block.position.y != null) {
    //     return (
    //       <CanvasBlock
    //         key={block.id}
    //         block={block}
    //         onMoveBlock={updateBlockPosition}
    //       />
    //     );
    //   }
      return null;
    });
  }, [updateBlockPosition]);

  return (
    <div className="canvas-area">
      {rows.map(row =>
        columns.map(col => (
          <GridCell key={`cell-${row}-${col}`} x={col} y={row} />
        ))
      )}
      {renderBlocks(canvasData.blocks)}
    </div>
  );
};

export default CanvasArea;
