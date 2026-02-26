import React from 'react';

export default function DrawingsImageCard({ src, alt }) {
  return (
    <div className="overflow-hidden select-none flex justify-center items-start">
      <img
        src={src}
        alt={alt}
        className="h-[250px] w-auto object-contain"
        draggable={false}
        loading="lazy"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}