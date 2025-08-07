import React, { useState } from 'react';
import images from './imageData.js'; 
import ImageCard from './ImageCard';

const categories = ['name', 'location', 'date'];

const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return 'Unknown Date';
  return date.toLocaleDateString('en-AU', { year: 'numeric', month: 'long' });
};

const groupByCategory = (images) => {
  const options = {
    name: new Set(),
    location: new Set(),
    date: new Set(),
  };

  images.forEach(img => {
    if (img.name) options.name.add(img.name);
    if (img.location) options.location.add(img.location);
    if (img.date) options.date.add(formatMonthYear(img.date));
  });

  return {
    name: Array.from(options.name).sort(),
    location: Array.from(options.location).sort(),
    date: Array.from(options.date).sort(),
  };
};

function LiveMusicIllustrations() {
  const [activeFilters, setActiveFilters] = useState({ name: [], location: [], date: [] });
  const [openCategory, setOpenCategory] = useState(null);

  const filterOptions = groupByCategory(images);

  const toggleCategory = (category) => {
    setOpenCategory(prev => prev === category ? null : category);
  };

  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const alreadySelected = prev[category].includes(value);
      return {
        ...prev,
        [category]: alreadySelected
          ? prev[category].filter(v => v !== value)
          : [...prev[category], value],
      };
    });
  };

  const clearFilter = (category, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(v => v !== value),
    }));
  };

  const filterImages = (img) => {
    return categories.every(cat => {
      if (activeFilters[cat].length === 0) return true;
      const val = cat === 'date' ? formatMonthYear(img.date) : img[cat];
      return activeFilters[cat].includes(val);
    });
  };

  const filteredImages = images.filter(filterImages);

  const clearAllFilters = () => {
    const cleared = {};
    categories.forEach(cat => {
      cleared[cat] = [];
    });
    setActiveFilters(cleared);
  };

  return (
    <div className="bg-white">
      <div className="p-8 pt-0 text-3xl md:text-8xl">Live Music Illustrations</div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap p-8 pb-4 pt-0 gap-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`border border-[blue] px-3 py-1 text-sm md:text-xl transition
              ${openCategory === category ? 'bg-[blue] text-white' : 'text-[blue] bg-white'}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Filter Option Buttons */}
      {openCategory && (
        <div className="p-8 pt-4 flex flex-wrap gap-2">
          {filterOptions[openCategory].map(value => (
            <button
              key={value}
              onClick={() => toggleFilter(openCategory, value)}
              className={`border border-[blue] px-2 py-1 text-xs md:text-sm transition rounded-full
                ${activeFilters[openCategory].includes(value) ? 'bg-[blue] text-white' : 'text-[blue] border-[blue]'}`}
            >
              {value}
            </button>
          ))}
        </div>
      )}

      {/* Active Filters Pills */}
      <div className="px-8 flex flex-wrap gap-2">
        {categories.flatMap(category => (
          activeFilters[category].map(value => (
            <div
              key={`${category}-${value}`}
              className="bg-red-700 text-white text-xs md:text-sm px-3 py-1 rounded-full flex items-start gap-2"
            >
              
              <button onClick={() => clearFilter(category, value)} className="text-white">{value} &times;</button>
            </div>
          ))
        ))}

        {/* ✕ Clear All */}
        {categories.some(cat => activeFilters[cat].length > 0) && (
        <button
            onClick={clearAllFilters}
            className=" text-xs text-red-700 border border-red-700 px-3 py-1 rounded-full"
        >
            ✕ Clear
        </button>
        )}
      </div>

      {/* Image Grid */}
      <div className="p-8">
        {filteredImages.length === 0 ? (
          <div className="text-center text-gray-500">No results match your filters.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredImages.map(({ id, src, alt }) => (
              <ImageCard key={id} src={src} alt={alt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveMusicIllustrations;