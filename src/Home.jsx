import React, { useState, useEffect, useMemo } from 'react';
import NavMenu from './NavMenu';
import images from './imageData';
import ImageCard from './ImageCard';
import ExpandedGallery from './ExpandedGallery';

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function Home() {
  const [shuffledImages, setShuffledImages] = useState([]);
  const [overlayIndex, setOverlayIndex] = useState(null);

  useEffect(() => {
    setShuffledImages(shuffleArray(images));
  }, []);

  const sizedImages = useMemo(() => {
    return shuffledImages.map(img => ({
      ...img,
      isLarge: Math.random() < 0.1,
    }));
  }, [shuffledImages]);

  const openOverlay = (index) => setOverlayIndex(index);
  const closeOverlay = () => setOverlayIndex(null);

  const showPrev = () =>
    setOverlayIndex(prev => prev > 0 ? prev - 1 : sizedImages.length - 1);

  const showNext = () =>
    setOverlayIndex(prev => prev < sizedImages.length - 1 ? prev + 1 : 0);

  return (
    <>
      <NavMenu onShuffle={() => setShuffledImages(shuffleArray(images))}/>

      {/* Main grid */}
      <div
        className="bg-white min-h-screen p-4"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '1rem',
          gridAutoFlow: 'dense',
        }}
      >
        {sizedImages.map((img, index) => (
          <div
            key={img.id}
            onClick={() => openOverlay(index)}
            className={`
              cursor-pointer
              ${img.isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
            `}
          >
            <ImageCard src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>

      <ExpandedGallery
        images={sizedImages}
        currentIndex={overlayIndex}
        onClose={closeOverlay}
        onPrev={showPrev}
        onNext={showNext}
      />
    </>
  );
}

export default Home;
