import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useCanvas } from '../../context/CanvasContext';
import './CanvasArea.css';

const CanvasArea = ({ onDropBlock }) => {
    const { canvasData } = useCanvas();
    const dropRef = useRef(null);

    const [, drop] = useDrop({
        accept: ['FUNCTION', 'VARIABLE', 'LOOP', 'CONDITIONAL'],
        drop: (item, monitor) => {
            const clientOffset = monitor.getClientOffset();
            if (clientOffset && dropRef.current) {

                const rect = dropRef.current.getBoundingClientRect();
                const adjustedX = clientOffset.x - rect.left;
                const adjustedY = clientOffset.y - rect.top;
                onDropBlock(item.id, adjustedX, adjustedY);
            }
        },
    });

    drop(dropRef); 

    return (
        <div ref={dropRef} className="canvas-area">
            {canvasData.data.blocks
                .filter(block => block.position && block.position.x !== null && block.position.y !== null)
                .map(block => (
                    <div
                        key={block.id || block.test}
                        className="canvasblock"
                        style={{
                            left: `${block.position.x - 20}px`,
                            top: `${block.position.y - 20}px`,
                            position: 'absolute',
                        }}>
                        {block.type === 'CONDITIONAL' ? block.test : block.id}
                    </div>
                ))}
        </div>
    );
};

export default CanvasArea;
