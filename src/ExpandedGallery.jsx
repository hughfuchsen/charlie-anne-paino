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
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose} // click outside closes
    >
      {/* Prev Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-32 sm:pl-4 lg:pl-52  text-white text-6xl rounded-full opacity-0 sm:opacity-100"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        ←
      </button>

      {/* Next Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-32 sm:pr-4 lg:pr-52  text-white text-6xl rounded-full opacity-0 sm:opacity-100"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        →
      </button>

      {/* Image + Caption Container */}
      <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={img.src}
          alt={img.alt}
          className="max-h-[70vh] max-w-[90vw] object-contain"
        />
        {formatCaption(img) && (
          <p className="text-white mt-4 text-center select-none">
            {formatCaption(img)}
          </p>
        )}
      </div>

      {/* Close Button */}
      <button
        className="absolute top-4 right-6 text-white text-3xl"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        ✕
      </button>
    </div>
  );
}

export default ExpandedGallery;
