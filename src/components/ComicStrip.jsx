import React from 'react';
import { useDrop } from 'react-dnd';
import { Rnd } from 'react-rnd';

function ComicPanel({ panelData, panelIndex, addItemToStrip, updateItemInPanel }) {
  const [, drop] = useDrop(() => ({
    accept: ['CHARACTER', 'TEXTBUBBLE'],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const panelRect = document.getElementById(`panel-${panelIndex}`).getBoundingClientRect();
      addItemToStrip(item, panelIndex, {
        x: offset.x - panelRect.left,
        y: offset.y - panelRect.top
      });
    },
  }));

  return (
    <div 
      ref={drop}
      id={`panel-${panelIndex}`}
      style={{ 
        border: '1px solid black', 
        height: '100%', 
        position: 'relative' 
      }}
    >
      {panelData.map((item) => (
        <Rnd
          key={item.id}
          default={{
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
          }}
          onDragStop={(e, d) => updateItemInPanel(panelIndex, item.id, { x: d.x, y: d.y })}
          onResizeStop={(e, direction, ref, delta, position) => {
            updateItemInPanel(panelIndex, item.id, {
              width: ref.style.width,
              height: ref.style.height,
              x: position.x,
              y: position.y
            });
          }}
          bounds="parent"
        >
          {item.type === 'CHARACTER' ? (
            <img src={item.src} alt={`Character ${item.id}`} style={{ width: '100%', height: '100%' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', border: '1px solid black', padding: '5px' }}>
              <textarea
                value={item.text}
                onChange={(e) => updateItemInPanel(panelIndex, item.id, { text: e.target.value })}
                style={{ width: '100%', height: '100%', resize: 'none', border: 'none' }}
              />
            </div>
          )}
        </Rnd>
      ))}
    </div>
  );
}

function ComicStrip({ layout, comicData, setComicData, addItemToStrip }) {
  const updateItemInPanel = (panelIndex, itemId, updates) => {
    setComicData(prevData => {
      const newData = [...prevData];
      newData[panelIndex] = newData[panelIndex].map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      );
      return newData;
    });
  };

  return (
    <div 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${layout}, 1fr)`,
        gap: '10px',
        width: '100%',
        height: '400px',
        border: '2px solid black',
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      {comicData.map((panelData, index) => (
        <ComicPanel 
          key={index}
          panelData={panelData}
          panelIndex={index}
          addItemToStrip={addItemToStrip}
          updateItemInPanel={updateItemInPanel}
        />
      ))}
    </div>
  );
}

export default ComicStrip;