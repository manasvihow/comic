import React from 'react';
import { useDrag } from 'react-dnd';

function TextBubbleItem({ id, shape }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TEXTBUBBLE',
    item: { id, shape, type: 'TEXTBUBBLE' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        width: '100px',
        height: '60px',
        margin: '10px',
        display: 'inline-block',
        backgroundColor: 'white',
        border: '2px solid black',
        borderRadius: shape === 'thought' ? '50%' : '25px',
        position: 'relative'
      }}
    >
      {shape === 'speech' && (
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          left: '20%',
          width: '20px',
          height: '20px',
          backgroundColor: 'white',
          border: '2px solid black',
          borderTop: 'none',
          borderLeft: 'none',
          transform: 'rotate(45deg)'
        }}></div>
      )}
      {shape === 'thought' && (
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          left: '30%',
          width: '15px',
          height: '15px',
          backgroundColor: 'white',
          border: '2px solid black',
          borderRadius: '50%'
        }}></div>
      )}
    </div>
  );
}

function TextBubbleSelector() {
  const bubbles = [
    { id: 1, shape: 'speech' },
    { id: 2, shape: 'thought' },
  ];

  return (
    <div>
      <h2>Text Bubbles</h2>
      {bubbles.map((bubble) => (
        <TextBubbleItem key={bubble.id} id={bubble.id} shape={bubble.shape} />
      ))}
    </div>
  );
}

export default TextBubbleSelector;