import React, { createContext, useContext, useEffect, useState } from 'react';
import { canvasService } from '../services/canvasService';

const maxRows = 4;
const maxColumns = 10;

const initialGrid = {
    blocks: [],
    grid: Array.from({ length: maxRows }, () =>
      Array.from({ length: maxColumns }, () => null)
    ),
  };

const CanvasContext = createContext();

export const useCanvas = () => useContext(CanvasContext);

export const CanvasProvider = ({ children }) => {
    const [canvasData, setCanvasData] = useState(initialGrid);

    useEffect(() => {
        console.log("Canvas Data updated:", canvasData);
    }, [canvasData]);

    const updateBlockContent = (blockId, newValue) => {
        setCanvasData(prevCanvasData => {
            
            const updatedBlocks = prevCanvasData.blocks.map(block => {
                if (block.id === blockId) {
                    return { ...block, value: newValue };
                }
                return block;
            });
            return {
                ...prevCanvasData,
                blocks: updatedBlocks,
            };
        });
    };
    
    
    const updateBlockPosition = (itemId, newX, newY) => {
        setCanvasData((prevCanvasData) => {
            let newGrid = prevCanvasData.grid.map(row => [...row]);
            let newBlocks = [...prevCanvasData.blocks];
    
            if (newY >= maxRows || newX >= maxColumns || newY < 0 || newX < 0) {
                return prevCanvasData; 
            }
            // Prevents blocks from being moved to an occupied cell
            if (newGrid[newY][newX] !== null) {
                return prevCanvasData;
            }
    
            const blockIndex = newBlocks.findIndex(block => block.id === itemId);
            if (blockIndex !== -1) {
                const block = newBlocks[blockIndex];
                // Clears the old grid position
                if (block.position.x != null && block.position.y != null) {
                    newGrid[block.position.y][block.position.x] = null;
                }
                // Updates the grid with block ID and updates block position
                newGrid[newY][newX] = itemId;
                newBlocks[blockIndex] = { ...block, position: { x: newX, y: newY } };
    
            } else {
                console.log(`Block ${itemId} not found.`);
            }
    
            return { ...prevCanvasData, blocks: newBlocks, grid: newGrid };
        });
    };   

    const saveCanvas = async (name, data) => {
        try {
            const savedData = await canvasService.saveCanvas(name, data);
            console.log("Canvas saved successfully", savedData);
        } catch (error) {
            console.error("Failed to save canvas", error);
        }
    };

    const loadCanvas = (data) => {    
        let gridExists = data.grid && Array.isArray(data.grid) && data.grid.length > 0;
        let newGrid;
    
        // Canvases created before the grid was implemented will not have a grid property
        // This checks if the grid exists and creates a new grid if it doesn't

        if (gridExists) {
            newGrid = data.grid; 
        } else {
            
            newGrid = Array.from({ length: maxRows }, () =>
                Array.from({ length: maxColumns }, () => null)
            );
    
            const loadedBlocks = data.data.blocks;
    
            loadedBlocks.forEach(block => {
                if (block.position && block.position.x != null && block.position.y != null) {
                    if (block.position.y < maxRows && block.position.x < maxColumns) {
                        newGrid[block.position.y][block.position.x] = block.id;
                    }
                }
            });
        }
    
        setCanvasData({
            blocks: data.data.blocks,
            grid: newGrid,
            name: data.name,
        });
    };
    


    const value = {
        canvasData,
        setCanvasData,
        loadCanvas,
        updateBlockPosition,
        updateBlockContent,
        saveCanvas,
    };

    return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>;
};
