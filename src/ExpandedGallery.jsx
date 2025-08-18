// import React, { useEffect } from 'react';

// function ExpandedGallery({ images, currentIndex, onClose, onPrev, onNext }) {
//   if (currentIndex === null) return null;

//   const img = images[currentIndex];

//   // Format date like "Month Year" or empty string
//   const formatDate = (date) => {
//     if (!date) return '';
//     const d = new Date(date);
//     return isNaN(d) ? '' : d.toLocaleDateString('en-AU', { year: 'numeric', month: 'long' });
//   };

//   const formatCaption = (img) => {
//     const parts = [img.name, img.location, formatDate(img.date)].filter(Boolean);
//     return parts.join(' - ');
//   };

//   useEffect(() => {
//     function handleKeyDown(e) {
//       if (e.key === 'Escape') onClose();
//       else if (e.key === 'ArrowLeft') onPrev();
//       else if (e.key === 'ArrowRight') onNext();
//     }

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [onClose, onPrev, onNext]);

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       {/* Close Button */}
//       <button
//         className="absolute top-4 right-6 text-white text-3xl"
//         onClick={(e) => { e.stopPropagation(); onClose(); }}
//       >
//         ✕
//       </button>

//       {/* Prev Arrow */}
//       <button
//         className="absolute left-4 text-white text-4xl"
//         onClick={(e) => { e.stopPropagation(); onPrev(); }}
//       >
//         ←
//       </button>

//       {/* Image */}
//       <img
//         src={img.src}
//         alt={img.alt}
//         className="max-h-[80%] max-w-[90%] object-contain"
//       />

//       {/* Next Arrow */}
//       <button
//         className="absolute right-4 text-white text-4xl select-none"
//         onClick={(e) => { e.stopPropagation(); onNext(); }}
//       >
//         →
//       </button>

//       {/* Caption */}
//       {formatCaption(img) && (
//         <p className="text-white mt-4 text-center select-none">
//           {formatCaption(img)}
//         </p>
//       )}
//     </div>
//   );
// }

// export default ExpandedGallery;


import React, { useEffect } from 'react';

function ExpandedGallery({ images, currentIndex, onClose, onPrev, onNext }) {
  if (currentIndex === null) return null;

  const img = images[currentIndex];

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return isNaN(d) ? '' : d.toLocaleDateString('en-AU', { year: 'numeric', month: 'long' });
  };

  const formatCaption = (img) => {
    const parts = [img.name, img.location, formatDate(img.date)].filter(Boolean);
    return parts.join(' - ');
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 p-4"
      // remove onClick from here so clicking image doesn't close
    >
      {/* Close Button */}
      <div
        className="absolute top-0 right-0 p-6"
        onClick={onClose}
      >
        <button className="text-white text-3xl">✕</button>
      </div>

      {/* Prev Arrow */}
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-6"
        onClick={onPrev}
      >
        <button className="text-white text-4xl select-none">←</button>
      </div>

      {/* Image */}
      <img
        src={img.src}
        alt={img.alt}
        className="max-h-[80%] max-w-[90%] object-contain"
      />

      {/* Next Arrow */}
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-6"
        onClick={onNext}
      >
        <button className="text-white text-4xl select-none">→</button>
      </div>

      {/* Caption */}
      {formatCaption(img) && (
        <p className="text-white mt-4 text-center select-none">
          {formatCaption(img)}
        </p>
      )}
    </div>
  );
}

export default ExpandedGallery;
