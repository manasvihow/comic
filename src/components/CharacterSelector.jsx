import React from 'react';
import { useDrag } from 'react-dnd';

function CharacterItem({ id, src }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CHARACTER',
    item: { id, src, type: 'CHARACTER' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={src}
      style={{ 
        opacity: isDragging ? 0.5 : 1, 
        cursor: 'move',
        width: '50px',
        height: '50px',
        margin: '5px'
      }}
      alt={`Character ${id}`}
    />
  );
}

function CharacterSelector() {
  const characters = [
    { id: 1, src: 'https://via.placeholder.com/50?text=1' },
    { id: 2, src: 'https://via.placeholder.com/50?text=2' },
  ];

  return (
    <div>
      <h2>Characters (Drag to comic strip)</h2>
      {characters.map((char) => (
        <CharacterItem key={char.id} id={char.id} src={char.src} />
      ))}
    </div>
  );
}

export default CharacterSelector;