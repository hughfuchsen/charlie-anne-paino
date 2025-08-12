import React, { useEffect } from 'react';

function ExpandedGallery({ images, currentIndex, onClose, onPrev, onNext }) {
  if (currentIndex === null) return null;

  const img = images[currentIndex];
  const formatCaption = (img) => {
    const parts = [img.name, img.location, img.date].filter(Boolean);
    return parts.join(' - ');
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-6 text-white text-3xl"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ✕
      </button>

      {/* Prev Arrow */}
      <button
        className="absolute left-4 text-white text-4xl"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        ←
      </button>

      {/* Image */}
      <img
        src={img.src}
        alt={img.alt}
        className="max-h-[80%] max-w-[90%] object-contain"
      />

      {/* Next Arrow */}
      <button
        className="absolute right-4 text-white text-4xl"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        →
      </button>

      {/* Caption */}
      {formatCaption(img) && (
        <p className="text-white mt-4 text-center">
          {formatCaption(img)}
        </p>
      )}
    </div>
  );
}

export default ExpandedGallery;
