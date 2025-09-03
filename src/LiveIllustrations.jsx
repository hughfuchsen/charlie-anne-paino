import React, { useState, useEffect } from 'react';
import NavMenu from './NavMenu';
import ImageCard from './ImageCard';
import ExpandedGallery from './ExpandedGallery';
import { fetchImages } from './imageData.js'; // fetches from Sanity

const categories = ['name', 'location', 'date'];

const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return 'unknown date';
  return date.toLocaleDateString('en-AU', { year: 'numeric', month: 'long' });
};

const groupByCategory = (images) => {
  const options = { name: new Set(), location: new Set(), date: new Set() };
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

function LiveIllustrations() {
  const [images, setImages] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ name: [], location: [], date: [] });
  const [openCategory, setOpenCategory] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetchImages().then(setImages);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isExpanded]);

  const filterOptions = groupByCategory(images);

  const toggleCategory = (category) => setOpenCategory(prev => prev === category ? null : category);

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
    setActiveFilters(prev => ({ ...prev, [category]: prev[category].filter(v => v !== value) }));
  };

  const filterImages = (img) => {
    return categories.every(cat => {
      if (!activeFilters[cat].length) return true;
      const val = cat === 'date' ? formatMonthYear(img.date) : img[cat];
      return activeFilters[cat].includes(val);
    });
  };

  const filteredImages = images.filter(filterImages);

  const clearAllFilters = () => setActiveFilters({ name: [], location: [], date: [] });

  // Group filtered images by name
  const groupedByName = filteredImages.reduce((groups, image) => {
    const groupName = image.name || 'Unknown Name';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(image);
    return groups;
  }, {});

  const orderedImages = Object.entries(groupedByName).flatMap(([_name, imgs]) => imgs);

  const showPrev = () => setStartIndex(i => i === 0 ? orderedImages.length - 1 : i - 1);
  const showNext = () => setStartIndex(i => i === orderedImages.length - 1 ? 0 : i + 1);

  return (
    <div className="bg-white">
      <NavMenu />

      <div className="p-8 pt-0 text-2xl md:text-5xl">live illustrations</div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap p-8 pb-4 pt-0 gap-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`border border-black px-3 py-1 text-sm md:text-xl transition select-none
              ${openCategory === category ? 'bg-black text-white' : 'text-black bg-white'}`}
          >
            {category.charAt(0).toLowerCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Filter Options */}
      {openCategory && (
        <div className="p-8 pt-4 flex flex-wrap gap-2 select-none">
          {filterOptions[openCategory].map(value => (
            <button
              key={value}
              onClick={() => toggleFilter(openCategory, value)}
              className={`border border-black px-2 py-1 text-xs md:text-sm rounded-full transition lowercase
                ${activeFilters[openCategory].includes(value) ? 'bg-black text-white' : 'text-black'}`}
            >
              {value}
            </button>
          ))}
        </div>
      )}

      {/* Active Filter Pills */}
      <div className="px-8 flex flex-wrap gap-2">
        {categories.flatMap(category =>
          activeFilters[category].map(value => (
            <div key={`${category}-${value}`} className="bg-red-700 text-white text-xs md:text-sm px-3 py-1 rounded-full flex items-start gap-2 select-none lowercase">
              <button onClick={() => clearFilter(category, value)} className="text-white lowercase">{value} &times;</button>
            </div>
          ))
        )}
        {categories.some(cat => activeFilters[cat].length > 0) && (
          <button onClick={clearAllFilters} className="text-xs text-red-700 border border-red-700 px-3 py-1 rounded-full select-none">✕ clear</button>
        )}
      </div>

      {/* Image Grid */}
      <div className="p-8 pt-4 space-y-8">
        {orderedImages.length === 0 ? (
          <div>no results match your filters :|</div>
        ) : (
          Object.entries(groupedByName).map(([name, imgs]) => (
            <div className="lowercase" key={name}>
              <p className="text-sm md:text-xl mb-2">{name}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {imgs.map((image, idx) => (
                  <div
                    key={image.id}
                    onClick={() => {
                      const index = orderedImages.findIndex(img => img.id === image.id);
                      setStartIndex(index);
                      setIsExpanded(true);
                    }}
                    className="cursor-pointer"
                  >
                    <ImageCard src={image.src} alt={image.alt} />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Expanded Gallery Overlay */}
      {isExpanded && (
        <ExpandedGallery
          images={orderedImages}
          currentIndex={startIndex}
          onClose={() => setIsExpanded(false)}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </div>
  );
}

export default LiveIllustrations;
