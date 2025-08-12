// import React, { useState, useEffect } from 'react';
// import LiveMusicIllustrations from './LiveMusicIllustrations';
// import Writings from './Writings';
// import images from './imageData';
// import ImageCard from './ImageCard';
// import ExpandedGallery from './ExpandedGallery';

// function shuffleArray(array) {
//   return array
//     .map(value => ({ value, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ value }) => value);
// }

// function Home() {
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [shuffledImages, setShuffledImages] = useState([]);
//   const [overlayIndex, setOverlayIndex] = useState(null);

//   useEffect(() => {
//     setShuffledImages(shuffleArray(images));
//   }, []);

//   const openOverlay = (index) => setOverlayIndex(index);
//   const closeOverlay = () => setOverlayIndex(null);

//   const showPrev = () =>
//     setOverlayIndex((prev) =>
//       prev > 0 ? prev - 1 : shuffledImages.length - 1
//     );

//   const showNext = () =>
//     setOverlayIndex((prev) =>
//       prev < shuffledImages.length - 1 ? prev + 1 : 0
//     );
    
//   return (
//     <>
//       <div className="p-8 bg-[white]">
//         <p
//           className="pt-0 md:pt-4 flex justify-start items-start text-1xl md:text-3xl underline"
//           style={{ fontWeight: 'bold', fontStyle: 'italic' }}
//         >
//           charlie anne paino
//         </p>
//         <br />
//         <details className="text-1xl open">
//           <summary
//             className="cursor-pointer"
//             onClick={() => {
//               if (selectedSection !== null) setSelectedSection(null);
//             }}
//           >
//             open my cupboards
//           </summary>
//           <ul className="ml-6 mt-2 space-y-1 list-disc">
//             <li>
//               <button
//                 onClick={() => setSelectedSection('live')}
//                 className="underline hover:no-underline"
//               >
//                 Live Music Illustrations
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setSelectedSection('writings')}
//                 className="underline hover:no-underline"
//               >
//                 Writings
//               </button>
//             </li>
//           </ul>
//         </details>
//       </div>

//       {selectedSection === 'live' && <LiveMusicIllustrations />}
//       {selectedSection === 'writings' && <Writings />}
//       {selectedSection === null && (
//       <>
//         <div className="bg-white min-h-screen p-4">
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {shuffledImages.map((img, index) => (
//               <div key={img.id} onClick={() => openOverlay(index)}>
//                 <ImageCard src={img.src} alt={img.alt} />
//               </div>
//             ))}
//           </div>
//         </div>

//         <ExpandedGallery
//         images={shuffledImages}
//         currentIndex={overlayIndex}
//         onClose={closeOverlay}
//         onPrev={showPrev}
//         onNext={showNext}
//         />
//       </>
//       )}

//     </>
//   );
// }

// export default Home;


import React, { useState, useEffect, useMemo } from 'react';
import LiveMusicIllustrations from './LiveMusicIllustrations';
import Writings from './Writings';
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
  const [selectedSection, setSelectedSection] = useState(null);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [overlayIndex, setOverlayIndex] = useState(null);

  // Shuffle images once on mount
  useEffect(() => {
    setShuffledImages(shuffleArray(images));
  }, []);

  // Memoize sizedImages so sizes don't change on every render
  const sizedImages = useMemo(() => {
    // Decide which images are "large" randomly (about 20%)
    return shuffledImages.map(img => ({
      ...img,
      isLarge: Math.random() < 0.1,
    }));
  }, [shuffledImages]);

  const openOverlay = (index) => setOverlayIndex(index);
  const closeOverlay = () => setOverlayIndex(null);

  const showPrev = () =>
    setOverlayIndex((prev) =>
      prev > 0 ? prev - 1 : sizedImages.length - 1
    );

  const showNext = () =>
    setOverlayIndex((prev) =>
      prev < sizedImages.length - 1 ? prev + 1 : 0
    );

  return (
    <>
      <div className="p-8 bg-[white]">
      <p
        className="pt-0 md:pt-4 flex justify-start items-start text-1xl md:text-3xl underline"
        style={{ fontWeight: 'bold', fontStyle: 'italic', cursor: 'pointer' }}
        onClick={() => {
          if (selectedSection === null) {
            setShuffledImages(shuffleArray(images));
          }
        }}
      >
        charlie anne paino
      </p>

        <br />
        <details className="text-1xl open">
          <summary
            className="cursor-pointer"
            onClick={() => {
              if (selectedSection !== null) setSelectedSection(null);
            }}
          >
            open my cupboards
          </summary>
          <ul className="ml-6 mt-2 space-y-1 list-disc">
            <li>
              <button
                onClick={() => setSelectedSection('live')}
                className="underline hover:no-underline"
              >
                Live Music Illustrations
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection('writings')}
                className="underline hover:no-underline"
              >
                Writings
              </button>
            </li>
          </ul>
        </details>
      </div>

      {selectedSection === 'live' && <LiveMusicIllustrations />}
      {selectedSection === 'writings' && <Writings />}
      {selectedSection === null && (
        <>
          <div
            className="bg-white min-h-screen p-4"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
              gap: '1rem',
              gridAutoFlow: 'dense', // key for packing items tightly
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
      )}
    </>
  );
}

export default Home;
