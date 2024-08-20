import React from 'react';
import { toPng } from 'html-to-image';

function DownloadButton({ comicData }) {
  const handleDownload = () => {
    const element = document.getElementById('comic-strip');
    toPng(element)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-comic-strip.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Error generating image:', err);
      });
  };

  return (
    <button onClick={handleDownload}>Download Comic</button>
  );
}

export default DownloadButton;