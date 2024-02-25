import React, { createContext, useContext, useEffect, useState } from 'react';

const CanvasContext = createContext();

export const useCanvas = () => useContext(CanvasContext);

export const CanvasProvider = ({ children }) => {
    const [canvasData, setCanvasData] = useState({ data: { blocks: [] } });

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
                    blocks: updateBlocks(prevCanvasData.data.blocks),
                },
            };
        });
    };
    
    const updateBlockPosition = (itemId, newX, newY) => {
        console.log('Updating block position:', itemId, newX, newY);
        setCanvasData(prevCanvasData => {
            const updateBlocks = (blocks, deltaX = 0, deltaY = 0, updateChildren = false) => blocks.map(block => {
                if (block.id === itemId) {
                    const oldX = block.position?.x ?? null;
                    const oldY = block.position?.y ?? null;
                    deltaX = newX - oldX;
                    deltaY = newY - oldY;
                    return { ...block, position: { x: newX, y: newY } };
                }

                if (updateChildren && block.position?.x !== null && block.position?.y !== null) {
                    return { 
                        ...block, 
                        position: { 
                            x: block.position.x + deltaX, 
                            y: block.position.y + deltaY 
                        },
                        children: block.children ? updateBlocks(block.children, deltaX, deltaY, true) : block.children,
                    };
                }

                if (block.children) {
                    return { 
                        ...block, 
                        children: updateBlocks(block.children, deltaX, deltaY, block.id === itemId || updateChildren)
                    };
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
        setCanvasData(prevCanvasData => {
            return { ...prevCanvasData, data: { ...prevCanvasData.data, blocks: [...prevCanvasData.data.blocks, item] } };
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
                    blocks: removeItem(prevCanvasData.data.blocks),
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
