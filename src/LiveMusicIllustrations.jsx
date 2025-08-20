// import React, { useState, useEffect } from 'react';
// import { fetchImages } from './imageData.js';
// import NavMenu from './NavMenu.jsx'; 
// import ImageCard from './ImageCard';
// import ExpandedGallery from './ExpandedGallery';

// const categories = ['name', 'location', 'date'];

// function LiveMusicIllustrations() {
//   const [images, setImages] = useState([]);
//   const [activeFilters, setActiveFilters] = useState({ name: [], location: [], date: [] });
//   const [openCategory, setOpenCategory] = useState(null);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [startIndex, setStartIndex] = useState(0);

//   // Fetch Sanity images
//   useEffect(() => {
//     fetchImages().then(setImages);
//   }, []);


//   // Disable scrolling when overlay is open
//   useEffect(() => {
//     document.body.style.overflow = isExpanded ? 'hidden' : '';
//     return () => { document.body.style.overflow = ''; };
//   }, [isExpanded]);

//   // Group images for filter options
//   const filterOptions = images.reduce(
//     (acc, img) => {
//       categories.forEach(cat => {
//         const val = cat === 'date' ? img.date : img[cat];
//         if (val) acc[cat].add(val);
//       });
//       return acc;
//     },
//     { name: new Set(), location: new Set(), date: new Set() }
//   );

//   const filterOptionsArray = {
//     name: Array.from(filterOptions.name).sort(),
//     location: Array.from(filterOptions.location).sort(),
//     date: Array.from(filterOptions.date).sort(),
//   };

//   const toggleCategory = (category) => setOpenCategory(prev => prev === category ? null : category);

//   const toggleFilter = (category, value) => {
//     setActiveFilters(prev => ({
//       ...prev,
//       [category]: prev[category].includes(value)
//         ? prev[category].filter(v => v !== value)
//         : [...prev[category], value],
//     }));
//   };

//   const clearFilter = (category, value) => {
//     setActiveFilters(prev => ({
//       ...prev,
//       [category]: prev[category].filter(v => v !== value),
//     }));
//   };

//   const clearAllFilters = () => {
//     setActiveFilters({ name: [], location: [], date: [] });
//   };

//   const filteredImages = images.filter(img =>
//     categories.every(cat => {
//       if (!activeFilters[cat].length) return true;
//       const val = cat === 'date' ? img.date : img[cat];
//       return activeFilters[cat].includes(val);
//     })
//   );

//   // Group filtered images by name
//   const groupedByName = filteredImages.reduce((groups, img) => {
//     const groupName = img.name || 'Unknown';
//     if (!groups[groupName]) groups[groupName] = [];
//     groups[groupName].push(img);
//     return groups;
//   }, {});

//   const orderedImages = Object.values(groupedByName).flat();

//   const showPrev = () => setStartIndex(prev => prev === 0 ? orderedImages.length - 1 : prev - 1);
//   const showNext = () => setStartIndex(prev => prev === orderedImages.length - 1 ? 0 : prev + 1);

//   return (
//     <div className="bg-white">
//       <NavMenu
//         onShuffle={() => setImages(prev => prev.sort(() => Math.random() - 0.5))}
//       />

//       <div className="p-8 pt-0 text-3xl md:text-8xl">Live Music Illustrations</div>

//       {/* Category Filter Buttons */}
//       <div className="flex flex-wrap p-8 pb-4 pt-0 gap-4">
//         {categories.map(cat => (
//           <button
//             key={cat}
//             onClick={() => toggleCategory(cat)}
//             className={`border border-black px-3 py-1 text-sm md:text-xl transition
//               ${openCategory === cat ? 'bg-black text-white' : 'bg-white text-black'}`}
//           >
//             {cat.charAt(0).toUpperCase() + cat.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Filter Options */}
//       {openCategory && (
//         <div className="p-8 pt-4 flex flex-wrap gap-2">
//           {filterOptionsArray[openCategory].map(value => (
//             <button
//               key={value}
//               onClick={() => toggleFilter(openCategory, value)}
//               className={`border border-black px-2 py-1 text-xs md:text-sm rounded-full transition
//                 ${activeFilters[openCategory].includes(value) ? 'bg-black text-white' : 'text-black'}`}
//             >
//               {value}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Active Filters Pills */}
//       <div className="px-8 flex flex-wrap gap-2">
//         {categories.flatMap(cat =>
//           activeFilters[cat].map(value => (
//             <div key={`${cat}-${value}`} className="bg-red-700 text-white text-xs md:text-sm px-3 py-1 rounded-full flex items-center gap-2">
//               <button onClick={() => clearFilter(cat, value)} className="text-white">{value} &times;</button>
//             </div>
//           ))
//         )}

//         {categories.some(cat => activeFilters[cat].length > 0) && (
//           <button
//             onClick={clearAllFilters}
//             className="text-xs text-red-700 border border-red-700 px-3 py-1 rounded-full"
//           >
//             ✕ Clear
//           </button>
//         )}
//       </div>

//       {/* Image Grid */}
//       <div className="p-8 space-y-8">
//         {orderedImages.length === 0 ? (
//           <div>No results match your filters.</div>
//         ) : (
//           Object.entries(groupedByName).map(([name, imgs]) => (
//             <div key={name}>
//               <p className="text-sm md:text-xl mb-2">{name}</p>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                 {imgs.map((img) => {
//                   const index = orderedImages.findIndex(i => i.id === img.id);
//                   return (
//                     <div
//                       key={img.id}
//                       onClick={() => {
//                         setStartIndex(index);
//                         setIsExpanded(true);
//                       }}
//                       className="cursor-pointer"
//                     >
//                       <ImageCard src={img.src} alt={img.alt} />
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Expanded Gallery Overlay */}
//       {isExpanded && (
//         <ExpandedGallery
//           images={orderedImages}
//           currentIndex={startIndex}
//           onClose={() => setIsExpanded(false)}
//           onPrev={showPrev}
//           onNext={showNext}
//         />
//       )}
//     </div>
//   );
// }

// export default LiveMusicIllustrations;


import React, { useState, useEffect } from 'react';
import NavMenu from './NavMenu';
import ImageCard from './ImageCard';
import ExpandedGallery from './ExpandedGallery';
import { fetchImages } from './imageData.js'; // fetches from Sanity

const categories = ['name', 'location', 'date'];

const formatMonthYear = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return 'Unknown Date';
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

function LiveMusicIllustrations() {
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

      <div className="p-8 pt-0 text-2xl md:text-6xl">Live Illustrations</div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap p-8 pb-4 pt-0 gap-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`border border-black px-3 py-1 text-sm md:text-xl transition
              ${openCategory === category ? 'bg-black text-white' : 'text-black bg-white'}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Filter Options */}
      {openCategory && (
        <div className="p-8 pt-4 flex flex-wrap gap-2">
          {filterOptions[openCategory].map(value => (
            <button
              key={value}
              onClick={() => toggleFilter(openCategory, value)}
              className={`border border-black px-2 py-1 text-xs md:text-sm rounded-full transition
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
            <div key={`${category}-${value}`} className="bg-red-700 text-white text-xs md:text-sm px-3 py-1 rounded-full flex items-start gap-2">
              <button onClick={() => clearFilter(category, value)} className="text-white">{value} &times;</button>
            </div>
          ))
        )}
        {categories.some(cat => activeFilters[cat].length > 0) && (
          <button onClick={clearAllFilters} className="text-xs text-red-700 border border-red-700 px-3 py-1 rounded-full">✕ Clear</button>
        )}
      </div>

      {/* Image Grid */}
      <div className="p-8 space-y-8">
        {orderedImages.length === 0 ? (
          <div>No results match your filters.</div>
        ) : (
          Object.entries(groupedByName).map(([name, imgs]) => (
            <div key={name}>
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

export default LiveMusicIllustrations;
