import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useCanvas } from '../../context/CanvasContext';
import './CanvasArea.css';

const EditableBlockContent = ({ block, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(block.type === 'CONDITIONAL' ? block.test : block.id);

    const handleSave = () => {
        onSave(block.id, value);
        setIsEditing(false);
    };

    return (
        isEditing ? (
            <input
                className="editable-content"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
                autoFocus
            />
        ) : (
            <div onDoubleClick={() => setIsEditing(true)}>
                {value}
            </div>
        )
    );
};

const CanvasArea = ({ onDropBlock }) => {
    const { canvasData, updateBlockContent } = useCanvas();

    const renderBlocks = (blocks, isChild = false) => blocks.map(block => (
        <div
            key={block.id || block.test}
            className={`canvasblock ${block.type.toLowerCase()} ${isChild ? 'child-block' : ''}`}
            style={{
                left: isChild ? 'initial' : `${block.position.x}px`,
                top: isChild ? 'initial' : `${block.position.y}px`,
                position: isChild ? 'relative' : 'absolute',
            }}
        >
            <div className="block-header">
                {['VARIABLE', 'CONDITIONAL'].includes(block.type) ? (
                    <EditableBlockContent block={block} onSave={updateBlockContent} />
                ) : (
                    block.type === 'CONDITIONAL' ? block.test : block.id
                )}
                <span className="block-type">{block.type}</span>
            </div>
            {block.children && <div className="child-container">{renderBlocks(block.children, true)}</div>}
        </div>
    ));

    const [, drop] = useDrop({
        accept: ['FUNCTION', 'VARIABLE', 'LOOP', 'CONDITIONAL'],
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const initialPosition = monitor.getInitialClientOffset();
            const canvasAreaRect = document.querySelector('.canvas-area').getBoundingClientRect();
    
            if (delta && initialPosition) {
                let newX = initialPosition.x + delta.x - canvasAreaRect.left;
                let newY = initialPosition.y + delta.y - canvasAreaRect.top;
                onDropBlock(item.id, newX, newY);
            }
        },
    });
    

    return (
        <div ref={drop} className="canvas-area">
            {renderBlocks(canvasData.data.blocks.filter(block => block.position && block.position.x != null && block.position.y != null))}
        </div>
    );
};

export default CanvasArea;
