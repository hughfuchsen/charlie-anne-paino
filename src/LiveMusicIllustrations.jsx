// import React, { useState } from 'react';
// import images from './imageData.js'; 
// import ImageCard from './ImageCard';

// const categories = ['name', 'location', 'date'];

// const formatMonthYear = (dateString) => {
//   const date = new Date(dateString);
//   if (isNaN(date)) return 'Unknown Date';
//   return date.toLocaleDateString('en-AU', { year: 'numeric', month: 'long' });
// };

// const groupByCategory = (images) => {
//   const options = {
//     name: new Set(),
//     location: new Set(),
//     date: new Set(),
//   };

//   images.forEach(img => {
//     if (img.name) options.name.add(img.name);
//     if (img.location) options.location.add(img.location);
//     if (img.date) options.date.add(formatMonthYear(img.date));
//   });

//   return {
//     name: Array.from(options.name).sort(),
//     location: Array.from(options.location).sort(),
//     date: Array.from(options.date).sort(),
//   };
// };

// function LiveMusicIllustrations() {
//   const [activeFilters, setActiveFilters] = useState({ name: [], location: [], date: [] });
//   const [openCategory, setOpenCategory] = useState(null);

//   const filterOptions = groupByCategory(images);

//   const toggleCategory = (category) => {
//     setOpenCategory(prev => prev === category ? null : category);
//   };

//   const toggleFilter = (category, value) => {
//     setActiveFilters(prev => {
//       const alreadySelected = prev[category].includes(value);
//       return {
//         ...prev,
//         [category]: alreadySelected
//           ? prev[category].filter(v => v !== value)
//           : [...prev[category], value],
//       };
//     });
//   };

//   const clearFilter = (category, value) => {
//     setActiveFilters(prev => ({
//       ...prev,
//       [category]: prev[category].filter(v => v !== value),
//     }));
//   };

//   const filterImages = (img) => {
//     return categories.every(cat => {
//       if (activeFilters[cat].length === 0) return true;
//       const val = cat === 'date' ? formatMonthYear(img.date) : img[cat];
//       return activeFilters[cat].includes(val);
//     });
//   };

//   const filteredImages = images.filter(filterImages);

//   const clearAllFilters = () => {
//     const cleared = {};
//     categories.forEach(cat => {
//       cleared[cat] = [];
//     });
//     setActiveFilters(cleared);
//   };

//   return (
//     <div className="bg-white">
//       <div className="p-8 pt-0 text-3xl md:text-8xl">Live Music Illustrations</div>

//       {/* Category Filter Buttons */}
//       <div className="flex flex-wrap p-8 pb-4 pt-0 gap-4">
//         {categories.map(category => (
//           <button
//             key={category}
//             onClick={() => toggleCategory(category)}
//             className={`border border-[black] px-3 py-1 text-sm md:text-xl transition
//               ${openCategory === category ? 'bg-[black] text-white' : 'text-[black] bg-white'}`}
//           >
//             {category.charAt(0).toUpperCase() + category.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Filter Option Buttons */}
//       {openCategory && (
//         <div className="p-8 pt-4 flex flex-wrap gap-2">
//           {filterOptions[openCategory].map(value => (
//             <button
//               key={value}
//               onClick={() => toggleFilter(openCategory, value)}
//               className={`border border-[black] px-2 py-1 text-xs md:text-sm transition rounded-full
//                 ${activeFilters[openCategory].includes(value) ? 'bg-[black] text-white' : 'text-[black] border-[black]'}`}
//             >
//               {value}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Active Filters Pills */}
//       <div className="px-8 flex flex-wrap gap-2">
//         {categories.flatMap(category => (
//           activeFilters[category].map(value => (
//             <div
//               key={`${category}-${value}`}
//               className="bg-red-700 text-white text-xs md:text-sm px-3 py-1 rounded-full flex items-start gap-2"
//             >
              
//               <button onClick={() => clearFilter(category, value)} className="text-white">{value} &times;</button>
//             </div>
//           ))
//         ))}

//         {/* ✕ Clear All */}
//         {categories.some(cat => activeFilters[cat].length > 0) && (
//         <button
//             onClick={clearAllFilters}
//             className=" text-xs text-red-700 border border-red-700 px-3 py-1 rounded-full"
//         >
//             ✕ Clear
//         </button>
//         )}
//       </div>


//         <div className="p-8">
//         {filteredImages.length === 0 ? (
//             <div className="text-center text-gray-500">No results match your filters.</div>
//         ) : (
//             // Group by name
//             Object.entries(
//             filteredImages.reduce((groups, image) => {
//                 const groupName = image.name || 'Unknown Name';
//                 if (!groups[groupName]) groups[groupName] = [];
//                 groups[groupName].push(image);
//                 return groups;
//             }, {})
//             ).map(([name, images]) => (
//             <div key={name} className="">
//                 <p className="text-sm md:text-xl">{name}</p>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                 {images.map(({ id, src, alt }) => (
//                     <ImageCard key={id} src={src} alt={alt} />
//                 ))}
//                 </div>
//             </div>
//             ))
//         )}
//         </div>


//     </div>
//   );
// }

// export default LiveMusicIllustrations;




import React, { useState , useEffect } from 'react';
import images from './imageData.js'; 
import ImageCard from './ImageCard';
import ExpandedGallery from './ExpandedGallery';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (isExpanded) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      document.body.style.overflow = '';
    }

    // Cleanup on unmount just in case
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);
  

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

  // Group filtered images by name for grid display
  const groupedByName = filteredImages.reduce((groups, image) => {
    const groupName = image.name || 'Unknown Name';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(image);
    return groups;
  }, {});

    // Flatten groupedByName into an array, preserving the order of groups & images:
    const orderedImages = Object.entries(groupedByName)
    .flatMap(([_name, imgs]) => imgs);

    const showPrev = () => {
        setStartIndex((i) => (i === 0 ? orderedImages.length - 1 : i - 1));
    };
      
      const showNext = () => {
        setStartIndex((i) => (i === orderedImages.length - 1 ? 0 : i + 1));
    };

  // Flatten filteredImages for easy index lookup in gallery
  // We'll pass filteredImages directly to ExpandedGallery

  return (
    <div className="bg-white">
      <div className="p-8 pt-0 text-3xl md:text-8xl">Live Music Illustrations</div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap p-8 pb-4 pt-0 gap-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`border border-[black] px-3 py-1 text-sm md:text-xl transition
              ${openCategory === category ? 'bg-[black] text-white' : 'text-[black] bg-white'}`}
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
              className={`border border-[black] px-2 py-1 text-xs md:text-sm transition rounded-full
                ${activeFilters[openCategory].includes(value) ? 'bg-[black] text-white' : 'text-[black] border-[black]'}`}
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
              <button 
                onClick={() => clearFilter(category, value)} 
                className="text-white"
              >
                {value} &times;
              </button>
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

      
        {/* Image Grid Grouped By Name */}
        <div className="p-8 space-y-8">
        {orderedImages.length === 0 ? (
            <div>No results match your filters.</div>
        ) : (
            Object.entries(groupedByName).map(([name, imgs]) => (
            <div key={name}>
                <p className="text-sm md:text-xl mb-2">{name}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {imgs.map((image) => {
                    // find index in orderedImages instead of filteredImages
                    const index = orderedImages.findIndex((img) => img.id === image.id);
                    return (
                    <div
                        key={image.id}
                        onClick={() => {
                        setStartIndex(index);
                        setIsExpanded(true);
                        }}
                        className="cursor-pointer"
                    >
                        <ImageCard src={image.src} alt={image.alt} />
                    </div>
                    );
                })}
                </div>
            </div>
            ))
        )}
        </div>



        {/* Expanded Gallery Overlay */}
        {isExpanded && (
        <ExpandedGallery
            images={orderedImages} // use the same ordering as the grid
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
