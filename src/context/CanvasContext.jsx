import React, { createContext, useContext, useEffect, useState } from 'react';

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

    const updateBlockContent = (blockId, newContent) => {
        setCanvasData(prevCanvasData => {
            const updateBlocks = (blocks) => blocks.map(block => {
                if (block.id === blockId && block.type === 'VARIABLE') {
                    return { ...block, id: newContent };
                } else if (block.id === blockId && block.type === 'CONDITIONAL') {
                    return { ...block, test: newContent };
                } else if (block.children) {
                    return { ...block, children: updateBlocks(block.children) };
                }
                return block;
            });

            return {
                ...prevCanvasData,
                data: {
                    ...prevCanvasData.data,
                    blocks: updateBlocks(prevCanvasData.blocks),
                },
            };
        });
    };
    
    const updateBlockPosition = (itemId, newX, newY) => {
        setCanvasData((prevCanvasData) => {
            // Clone the grid and blocks array
            let newGrid = prevCanvasData.grid.map(row => [...row]);
            let newBlocks = [...prevCanvasData.blocks];
    
            // Ensure newX and newY are within grid bounds
            if (newY >= maxRows || newX >= maxColumns || newY < 0 || newX < 0) {
                console.log("New position is out of grid bounds.");
                return prevCanvasData; // Exit if new position is out of bounds
            }
    
            // Log the current target cell state for debugging
            console.log(`Target cell state before move: ${newGrid[newY][newX]}`);
    
            // Check if the target grid cell is already occupied
            if (newGrid[newY][newX] !== null) {
                console.log("Target position is already occupied.");
                return prevCanvasData; // Exit without updating if the cell is occupied
            }
    
            const blockIndex = newBlocks.findIndex(block => block.id === itemId);
            if (blockIndex !== -1) {
                const block = newBlocks[blockIndex];
                // Clear the block's previous position if it was set
                if (block.position.x != null && block.position.y != null) {
                    newGrid[block.position.y][block.position.x] = null;
                }
                // Set the block's new position
                newGrid[newY][newX] = itemId;
                newBlocks[blockIndex] = { ...block, position: { x: newX, y: newY } };
    
                console.log(`Moved block ${itemId} to [${newX}, ${newY}]`);
            } else {
                console.log(`Block ${itemId} not found.`);
            }
    
            return { ...prevCanvasData, blocks: newBlocks, grid: newGrid };
        });
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
        });
    };
    
    

    const addCanvasItem = (item) => {
        setCanvasData(prevCanvasData => {
            return { ...prevCanvasData, data: { ...prevCanvasData.data, blocks: [...prevCanvasData.blocks, item] } };
        });
    };

    const removeCanvasItem = (itemId) => {
        setCanvasData(prevCanvasData => {
            const removeItem = (blocks) => blocks.filter(block => block.id !== itemId)
                .map(block => block.children ? { ...block, children: removeItem(block.children) } : block);

            return {
                ...prevCanvasData,
                data: {
                    ...prevCanvasData.data,
                    blocks: removeItem(prevCanvasData.blocks),
                },
            };
        });
    };

    const value = {
        canvasData,
        loadCanvas,
        addCanvasItem,
        removeCanvasItem,
        updateBlockPosition,
        updateBlockContent,
    };

    return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>;
};
