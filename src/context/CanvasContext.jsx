import React, { createContext, useContext, useState } from 'react';

const CanvasContext = createContext();

export const useCanvas = () => useContext(CanvasContext);

export const CanvasProvider = ({ children }) => {
    const [canvasData, setCanvasData] = useState([]);

    const updateBlockPosition = (itemId, x, y) => {
        setCanvasData(prevCanvasData => {
          return {
            ...prevCanvasData,
            data: {
              ...prevCanvasData.data,
              blocks: prevCanvasData.data.blocks.map(block => {
                if (block.id === itemId) {
                  return { ...block, position: { x, y } };
                }
                return block;
              }),
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
