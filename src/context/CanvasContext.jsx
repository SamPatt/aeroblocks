import React, { createContext, useContext, useEffect, useState } from 'react';

const maxRows = 2;
const maxColumns = 2;

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
          let newGrid = prevCanvasData.grid.map(row => [...row]);
          let newBlocks = [...prevCanvasData.blocks];
      
          const blockIndex = newBlocks.findIndex(block => block.id === itemId);
          if (blockIndex !== -1) {
            const block = newBlocks[blockIndex];
            if (block.position.x !== null && block.position.y !== null) {
              newGrid[block.position.y][block.position.x] = null;
            }
            newGrid[newY][newX] = itemId;
            newBlocks[blockIndex] = { ...block, position: { x: newX, y: newY } };
          }
      
          return { ...prevCanvasData, blocks: newBlocks, grid: newGrid };
        });
      };
    
    

      const loadCanvas = (data) => {
        console.log("Loading canvas data:", JSON.stringify(data.blocks));
        setCanvasData(prevCanvasData => {
            return {
                ...prevCanvasData,
                blocks: data.data.blocks,
            };
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
