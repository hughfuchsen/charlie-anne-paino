import React, { useState, useEffect } from 'react';
import NavMenu from './NavMenu';
import DrawingsImageCard from './DrawingsImageCard';
import ExpandedGallery from './ExpandedGallery';
import { fetchDrawings } from './imageData.js';

const categories = ['name', 'location', 'date'];

const normalizeName = (name) => name?.trim().toLowerCase();


const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return 'unknown date';
  return date.toLocaleDateString('en-AU', { year: 'numeric', month: 'long' });
};

export default function Drawings({ years = [], hardcodedOrder = [] }) {
  const [images, setImages] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ name: [], location: [], date: [] });
  const [openCategory, setOpenCategory] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetchDrawings().then(setImages);
  }, []);

  useEffect(() => {
    fetchDrawings().then(data => {
      console.log("DRAWINGS DATA:", data);
      setImages(data);
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isExpanded]);

  // Build filter options dynamically
  const filterOptions = categories.reduce((acc, cat) => {
    acc[cat] = Array.from(
      new Set(
        images.filter(img => {
          if (!years.length) return true;
          return years.includes(new Date(img.date).getFullYear());
        })
          .map(img => cat === 'date' ? formatMonthYear(img.date) : img[cat])
          .filter(Boolean)
      )
    ).sort();
    return acc;
  }, {});

  const toggleCategory = (category) => setOpenCategory(prev => prev === category ? null : category);
  const toggleFilter = (category, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };
  const clearFilter = (category, value) => setActiveFilters(prev => ({
    ...prev,
    [category]: prev[category].filter(v => v !== value)
  }));
  const clearAllFilters = () => setActiveFilters({ name: [], location: [], date: [] });

  const filterImages = (img) => categories.every(cat => {
    if (!activeFilters[cat].length) return true;
    const val = cat === 'date' ? formatMonthYear(img.date) : img[cat];
    return activeFilters[cat].includes(val);
  });

  // // Filter images by selected years and active filters
  // const filteredImages = images
  //   .filter(img => years.includes(new Date(img.date).getFullYear()))
  //   .filter(filterImages);

  const filteredImages = images
  .filter(img => {
    if (!years.length) return true;
    return years.includes(new Date(img.date).getFullYear());
  })
  .filter(filterImages);
  
  // Group by name
  const groupedByName = filteredImages.reduce((groups, img) => {
    const groupName = img.name && img.name.trim() !== '' ? img.name : '*Unknown*';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(img);
    return groups;
  }, {});

  // Sort images within each group by imageOrder, fallback to newest first
  Object.values(groupedByName).forEach(group => {
    group.sort((a, b) => {
      if (a.imageOrder != null && b.imageOrder != null) return a.imageOrder - b.imageOrder;
      if (a.imageOrder != null) return -1;
      if (b.imageOrder != null) return 1;
      return new Date(b.date) - new Date(a.date);
    });
  });

  const normalizedHardcoded = hardcodedOrder.map(n => normalizeName(n));

  // Order groups by hardcoded lineup → lineUpOrder → unknowns
  const orderedGroups = Object.entries(groupedByName).sort(([aName, aImgs], [bName, bImgs]) => {
    const normA = normalizeName(aName);
    const normB = normalizeName(bName);

    // push unknowns to bottom
    if (normA === '*unknown*') return 1;
    if (normB === '*unknown*') return -1;

    const aIndex = normalizedHardcoded.indexOf(normA);
    const bIndex = normalizedHardcoded.indexOf(normB);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    const aLine = aImgs[0]?.lineUpOrder ?? Infinity;
    const bLine = bImgs[0]?.lineUpOrder ?? Infinity;
    return aLine - bLine;
  });

  const orderedImages = orderedGroups.flatMap(([, imgs]) => imgs);

  const showPrev = () => setStartIndex(i => i === 0 ? orderedImages.length - 1 : i - 1);
  const showNext = () => setStartIndex(i => i === orderedImages.length - 1 ? 0 : i + 1);

  return (
    <div className="bg-white">
      <NavMenu />
      {/* <NavMenu
        onShuffle={() => setShuffledImages(shuffleArray(images))}
        onResetStory={() => setSelectedId(null)} // reset selected story
        currentStoryTitle={selectedStory ? selectedStory.title : null}
      />    */}
      
      <div className="p-8 pt-0 text-2xl md:text-5xl">drawings</div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap p-8 pb-4 pt-0 gap-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`border border-black px-3 py-1 text-sm md:text-xl transition select-none
              ${openCategory === category ? 'bg-black text-white' : 'text-black bg-white'}`}
          >
            {category}
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
        {orderedGroups.length === 0 ? (
          <div>no results match your filters :|</div>
        ) : (
          orderedGroups.map(([name, imgs]) => (
            <div className="lowercase" key={name}>
              <p className="text-sm md:text-xl mb-2">{name}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {imgs.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => {
                      const index = orderedImages.findIndex(img => img.id === image.id);
                      setStartIndex(index);
                      setIsExpanded(true);
                    }}
                    className="cursor-pointer"
                  >
                    <DrawingsImageCard src={image.src} alt={image.alt} />
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
