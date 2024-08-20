import React from 'react';

function LayoutSelector({ layout, setLayout }) {
  return (
    <div>
      <h2>Select Layout (Current: {layout} panels)</h2>
      <button style={{ padding: '10px', margin: '5px' }} onClick={() => setLayout(2)}>2 panels</button>
      <button style={{ padding: '10px', margin: '5px' }} onClick={() => setLayout(3)}>3 panels</button>
      <button style={{ padding: '10px', margin: '5px' }} onClick={() => setLayout(4)}>4 panels</button>
    </div>
  );
}

export default LayoutSelector;