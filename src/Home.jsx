// // import React, { useState, useEffect, useMemo } from 'react';
// // import NavMenu from './NavMenu';
// // import { fetchImages } from './imageData.js';
// // import ImageCard from './ImageCard';
// // import ExpandedGallery from './ExpandedGallery';

// // function shuffleArray(array) {
// //   return array
// //     .map(value => ({ value, sort: Math.random() }))
// //     .sort((a, b) => a.sort - b.sort)
// //     .map(({ value }) => value);
// // }

// // function Home() {
// //   const [shuffledImages, setShuffledImages] = useState([]);
// //   const [overlayIndex, setOverlayIndex] = useState(null);

// //   useEffect(() => {
// //     setShuffledImages(shuffleArray(fetchImages));
// //   }, []);

// //   const sizedImages = useMemo(() => {
// //     return shuffledImages.map(img => ({
// //       ...img,
// //       isLarge: Math.random() < 0.1,
// //     }));
// //   }, [shuffledImages]);

// //   const openOverlay = (index) => setOverlayIndex(index);
// //   const closeOverlay = () => setOverlayIndex(null);

// //   const showPrev = () =>
// //     setOverlayIndex(prev => prev > 0 ? prev - 1 : sizedImages.length - 1);

// //   const showNext = () =>
// //     setOverlayIndex(prev => prev < sizedImages.length - 1 ? prev + 1 : 0);

// //   return (
// //     <>
// //       <NavMenu onShuffle={() => setShuffledImages(shuffleArray(fetchImages))}/>

// //       {/* Main grid */}
// //       <div
// //         className="bg-white min-h-screen p-4"
// //         style={{
// //           display: 'grid',
// //           gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
// //           gap: '1rem',
// //           gridAutoFlow: 'dense',
// //         }}
// //       >
// //         {sizedImages.map((img, index) => (
// //           <div
// //             key={img.id}
// //             onClick={() => openOverlay(index)}
// //             className={`
// //               cursor-pointer
// //               ${img.isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
// //             `}
// //           >
// //             <ImageCard src={img.src} alt={img.alt} />
// //           </div>
// //         ))}
// //       </div>

// //       <ExpandedGallery
// //         fetchImages={sizedImages}
// //         currentIndex={overlayIndex}
// //         onClose={closeOverlay}
// //         onPrev={showPrev}
// //         onNext={showNext}
// //       />
// //     </>
// //   );
// // }

// // export default Home;


// import React, { useState, useEffect, useMemo } from 'react';
// import NavMenu from './NavMenu';
// import { fetchImages } from './imageData.js';
// import ImageCard from './ImageCard';
// import ExpandedGallery from './ExpandedGallery';

// function shuffleArray(array) {
//   return array
//     .map(value => ({ value, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ value }) => value);
// }

// function Home() {
//   const [shuffledImages, setShuffledImages] = useState([]);
//   const [overlayIndex, setOverlayIndex] = useState(null);

//   useEffect(() => {
//     // fetch images from Sanity
//     fetchImages().then(images => setShuffledImages(shuffleArray(images)));
//   }, []);

//   const sizedImages = useMemo(() => {
//     return shuffledImages.map(img => ({
//       ...img,
//       isLarge: Math.random() < 0.1,
//     }));
//   }, [shuffledImages]);

//   const openOverlay = (index) => setOverlayIndex(index);
//   const closeOverlay = () => setOverlayIndex(null);

//   const showPrev = () =>
//     setOverlayIndex(prev => prev > 0 ? prev - 1 : sizedImages.length - 1);

//   const showNext = () =>
//     setOverlayIndex(prev => prev < sizedImages.length - 1 ? prev + 1 : 0);

//   return (
//     <>
//       <NavMenu onShuffle={() => setShuffledImages(shuffleArray(shuffledImages))}/>

//       {/* Main grid */}
//       <div
//         className="bg-white min-h-screen p-4"
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//           gap: '1rem',
//           gridAutoFlow: 'dense',
//         }}
//       >
//         {sizedImages.map((img, index) => (
//           <div
//             key={img.id}
//             onClick={() => openOverlay(index)}
//             className={`
//               cursor-pointer
//               ${img.isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
//             `}
//           >
//             <ImageCard src={img.src} alt={img.alt} />
//           </div>
//         ))}
//       </div>

//       {overlayIndex !== null && (
//          <ExpandedGallery
//          images={orderedImages}
//          currentIndex={startIndex}
//          onClose={() => setIsExpanded(false)}
//          onPrev={showPrev}
//          onNext={showNext}
//        />
//       )}
//     </>
//   );
// }

// export default Home;


// import React, { useState, useEffect, useMemo } from 'react';
// import NavMenu from './NavMenu';
// import { fetchImages } from './imageData.js';
// import ImageCard from './ImageCard';
// import ExpandedGallery from './ExpandedGallery';

// function shuffleArray(array) {
//   return array
//     .map(value => ({ value, sort: Math.random() }))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({ value }) => value);
// }

// function Home() {
//   const [images, setImages] = useState([]);
//   const [overlayIndex, setOverlayIndex] = useState(null);

//   // Fetch Sanity images
//   useEffect(() => {
//     fetchImages().then(images => setShuffledImages(shuffleArray(images)));
//   }, []);

//   // Add random sizing
//   const sizedImages = useMemo(() => {
//     return images.map(img => ({
//       ...img,
//       isLarge: Math.random() < 0.1,
//     }));
//   }, [images]);

//   const openOverlay = (index) => setOverlayIndex(index);
//   const closeOverlay = () => setOverlayIndex(null);

//   const showPrev = () =>
//     setOverlayIndex(prev => prev > 0 ? prev - 1 : sizedImages.length - 1);

//   const showNext = () =>
//     setOverlayIndex(prev => prev < sizedImages.length - 1 ? prev + 1 : 0);

//   return (
//     <>
//       <NavMenu onShuffle={() => setImages(shuffleArray(images))}/>

//       {/* Main grid */}
//       <div
//         className="bg-white min-h-screen p-4"
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//           gap: '1rem',
//           gridAutoFlow: 'dense',
//         }}
//       >
//         {sizedImages.map((img, index) => (
//           <div
//             key={img.id}
//             onClick={() => openOverlay(index)}
//             className={`cursor-pointer ${img.isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
//           >
//             <ImageCard src={img.src} alt={img.alt} />
//           </div>
//         ))}
//       </div>

//       {/* Expanded Gallery Overlay */}
//       {overlayIndex !== null && (
//         <ExpandedGallery
//           images={sizedImages}
//           currentIndex={overlayIndex}
//           onClose={closeOverlay}
//           onPrev={showPrev}
//           onNext={showNext}
//         />
//       )}
//     </>
//   );
// }

// export default Home;


import React, { useState, useEffect, useMemo } from 'react';
import { fetchImages } from './imageData.js';
import NavMenu from './NavMenu';
import ImageCard from './ImageCard';
import ExpandedGallery from './ExpandedGallery';

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function Home() {
  const [images, setImages] = useState([]);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [overlayIndex, setOverlayIndex] = useState(null);

  useEffect(() => {
    fetchImages().then(data => {
      setImages(data);
      setShuffledImages(shuffleArray(data));
    });
  }, []);

  const sizedImages = useMemo(
    () => shuffledImages.map(img => ({ ...img, isLarge: Math.random() < 0.1 })),
    [shuffledImages]
  );

  // Overlay navigation functions
  const openOverlay = index => setOverlayIndex(index);
  const closeOverlay = () => setOverlayIndex(null);
  const showPrev = () => setOverlayIndex(prev => (prev > 0 ? prev - 1 : sizedImages.length - 1));
  const showNext = () => setOverlayIndex(prev => (prev < sizedImages.length - 1 ? prev + 1 : 0));

  return (
    <>
      <NavMenu onShuffle={() => setShuffledImages(shuffleArray(images))} />

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
            className={`cursor-pointer ${img.isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
          >
            <ImageCard src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>

      {overlayIndex !== null && (
        <ExpandedGallery
          images={sizedImages}
          currentIndex={overlayIndex}
          onClose={closeOverlay}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </>
  );
}

export default Home;
