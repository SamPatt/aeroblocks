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
        console.log("Canvas Data updated:", JSON.stringify(canvasData));
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
                console.log("New position is out of grid bounds.");
                return prevCanvasData; 
            }


            console.log(`Target cell state before move: ${newGrid[newY][newX]}`);
    
            if (newGrid[newY][newX] !== null) {
                console.log("Target position is already occupied.");
                return prevCanvasData;
            }
    
            const blockIndex = newBlocks.findIndex(block => block.id === itemId);
            if (blockIndex !== -1) {
                const block = newBlocks[blockIndex];
                if (block.position.x != null && block.position.y != null) {
                    newGrid[block.position.y][block.position.x] = null;
                }
                newGrid[newY][newX] = itemId;
                newBlocks[blockIndex] = { ...block, position: { x: newX, y: newY } };
    
                console.log(`Moved block ${itemId} to [${newX}, ${newY}]`);
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
        console.log("Loading canvas data:", JSON.stringify(data.blocks));
    
        const newGrid = Array.from({ length: maxRows }, () =>
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
    
        setCanvasData({
            blocks: loadedBlocks,
            grid: newGrid,
            name: data.name,
        });
    };


    const value = {
        canvasData,
        loadCanvas,
        updateBlockPosition,
        updateBlockContent,
        saveCanvas,
    };

    return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>;
};
