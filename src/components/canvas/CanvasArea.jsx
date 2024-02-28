import React from "react";
import GridCell from "./GridCell";
import "./CanvasArea.css";

// Creates the canvas area with grid cells

const maxRows = 4;
const maxColumns = 10;

const CanvasArea = () => {
  const rows = Array.from({ length: maxRows }, (_, i) => i);
  const columns = Array.from({ length: maxColumns }, (_, i) => i);

  return (
    <div className="canvas-area">
      {rows.map(row =>
        columns.map(col => (
          <GridCell key={`cell-${row}-${col}`} x={col} y={row} />
        ))
      )}
    </div>
  );
};

export default CanvasArea;
