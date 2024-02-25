import React, { useCallback, useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useCanvas } from '../../context/CanvasContext';
import './CanvasArea.css';

const EditableBlockContent = ({ block, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(block.name);

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

const CanvasBlock = ({ block, onMoveBlock }) => {
    const [{ isDragging }, drag] = useDrag({
        type: block.type,
        item: { id: block.id, type: block.type, name: block.name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const result = monitor.getDropResult();
            if (result && item.id) {
                onMoveBlock(item.id, result.x, result.y);
            }
        },
    });

    let label = block.name;
    if (block.type === 'LOOP') {
        label = `${block.loopType.toUpperCase()} over ${block.iterable}`;
    } else if (block.type === 'CONDITIONAL') {
        label = `IF ${block.condition}`;
    }

    const renderIOBlocks = (block) => {
        return (
            <>
                {block.inputs?.map(input => (
                    <div key={input.id} className="io-block input-block">{input.name}</div>
                ))}
                <div className="main-block">{block.name}</div>
                {block.outputs?.map(output => (
                    <div key={output.id} className="io-block output-block">{output.name}</div>
                ))}
            </>
        );
    };

    return (
        <div
            ref={drag}
            className={`canvasblock ${block.type.toLowerCase()} ${isDragging ? 'dragging' : ''}`}
            style={{
                left: `${block.position.x}px`,
                top: `${block.position.y}px`,
            }}
        >
            <div className="block-content">
                {renderIOBlocks(block)}
            </div>
        </div>
    );
};

const CanvasArea = ({ onDropBlock }) => {
    const { canvasData, updateBlockPosition } = useCanvas();

    const moveBlock = useCallback((id, x, y) => {
        updateBlockPosition(id, x, y);
    }, [updateBlockPosition]);

    const renderBlocks = (blocks) => blocks
        .filter(block => block.position && block.position.x !== null && block.position.y !== null) // Only render blocks with a set position
        .map((block) => (
            <CanvasBlock key={block.id} block={block} onMoveBlock={moveBlock} />
        ));

        const [, drop] = useDrop({
            accept: ['FUNCTION', 'VARIABLE', 'LOOP', 'CONDITIONAL'],
            drop: (item, monitor) => {
                const delta = monitor.getDifferenceFromInitialOffset();
                const initialOffset = monitor.getInitialSourceClientOffset();
        
                if (delta && initialOffset) {
                    const newX = Math.round(initialOffset.x + delta.x);
                    const newY = Math.round(initialOffset.y + delta.y);
                    onDropBlock(item.id, newX, newY);
                }
            },
        });

    return (
        <div ref={drop} className="canvas-area">
            {renderBlocks(canvasData.data.blocks)}
        </div>
    );
};

export default CanvasArea;