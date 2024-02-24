import React, { createContext, useContext, useEffect, useState } from 'react';

const CanvasContext = createContext();

export const useCanvas = () => useContext(CanvasContext);

export const CanvasProvider = ({ children }) => {
    const [canvasData, setCanvasData] = useState([]);

    useEffect(() => {
        console.log("Canvas Data updated:", canvasData);
      }, [canvasData]);
      

      const updateBlockPosition = (itemId, x, y) => {
        console.log('Updating block position:', itemId, x, y);
        setCanvasData(prevCanvasData => {
          const updateBlocks = (blocks) => blocks.map(block => {
            
            if (block.id === itemId) {
              return { ...block, position: { x, y } };
            }
            if (block.children) {
              return { ...block, children: updateBlocks(block.children) };
            }
            return block;
          });
      
          return {
            ...prevCanvasData,
            data: {
              ...prevCanvasData.data,
              blocks: updateBlocks(prevCanvasData.data.blocks),
            },
          };
        });
      };
      
      
      

    const loadCanvas = (data) => {
        setCanvasData(data);
    };

    const addCanvasItem = (item) => {
        setCanvasData([...canvasData, item]);
    };

    const removeCanvasItem = (itemId) => {
        setCanvasData(canvasData.filter(item => item.id !== itemId));
    };

    const value = {
        canvasData,
        loadCanvas,
        addCanvasItem,
        removeCanvasItem,
        updateBlockPosition,
    };

    return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>;
};
