import React, { useCallback, useState, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { useCanvas } from "../../context/CanvasContext";
import GridCell from "./GridCell";
import "./CanvasArea.css";

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
