import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LayoutSelector from './components/LayoutSelector';
import CharacterSelector from './components/CharacterSelector';
import TextBubbleSelector from './components/TextBubbleSelector';
import ComicStrip from './components/ComicStrip';
import DownloadButton from './components/DownloadButton';

function App() {
  const [layout, setLayout] = useState(2);
  const [comicData, setComicData] = useState(Array(layout).fill().map(() => []));

  const addItemToStrip = (item, panelIndex, offset) => {
    const newItem = {
      ...item,
      id: Date.now(),
      x: offset.x,
      y: offset.y,
      width: 100,
      height: 100,
      text: item.type === 'TEXTBUBBLE' ? '' : undefined,
    };
    
    setComicData(prevData => {
      const newData = [...prevData];
      newData[panelIndex] = [...newData[panelIndex], newItem];
      return newData;
    });
  };

  const updateLayout = (newLayout) => {
    setLayout(newLayout);
    setComicData(prevData => {
      const newData = Array(newLayout).fill().map((_, i) => prevData[i] || []);
      return newData;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Comic Strip Maker</h1>
        <LayoutSelector layout={layout} setLayout={updateLayout} />
        <CharacterSelector />
        <TextBubbleSelector />
        <ComicStrip 
          layout={layout} 
          comicData={comicData} 
          setComicData={setComicData} 
          addItemToStrip={addItemToStrip}
        />
        <DownloadButton comicData={comicData} />
      </div>
    </DndProvider>
  );
}

export default App;