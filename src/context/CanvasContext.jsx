import React, { createContext, useContext, useState } from 'react';

const CanvasContext = createContext();

export const useCanvas = () => useContext(CanvasContext);

export const CanvasProvider = ({ children }) => {
    const [canvasData, setCanvasData] = useState([]);

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
    };

    return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>;
};
