import { memo, useMemo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};
export const Card = memo(function Card({ id, text, moveCard }) {
    const ref = useRef(null);
    const [{ isDragging, handlerId }, connectDrag] = useDrag({
        type: ItemTypes.CARD,
        item: { id },
        collect: (monitor) => {
            const result = {
                handlerId: monitor.getHandlerId(),
                isDragging: monitor.isDragging(),
            };
            return result;
        },
    });
    const [, connectDrop] = useDrop({
        accept: ItemTypes.CARD,
        hover({ id: draggedId }) {
            if (draggedId !== id) {
                moveCard(draggedId, id);
            }
        },
    });
    connectDrag(ref);
    connectDrop(ref);
    const opacity = isDragging ? 0 : 1;
    const containerStyle = useMemo(() => ({ ...style, opacity }), [opacity]);
    return (<div ref={ref} style={containerStyle} data-handler-id={handlerId}>
			{text}
		</div>);
});
