// import React, { useState } from 'react';
// import images from './imageData.js'; 
// import ImageCard from './ImageCard';

// function LiveMusicIllustrations() {
//   const [sortBy, setSortBy] = useState('location');

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   // Helper to format date to "Month Year"
//   const formatMonthYear = (dateString) => {
//     const date = new Date(dateString);
//     if (isNaN(date)) return 'Unknown Date';
//     return date.toLocaleDateString('en-AU', { year: 'numeric', month: 'long' });
//   };

//   // Generic grouping function
//   const groupBy = (arr, keyFn) => {
//     return arr.reduce((acc, item) => {
//       const key = keyFn(item) || 'Unknown';
//       if (!acc[key]) acc[key] = [];
//       acc[key].push(item);
//       return acc;
//     }, {});
//   };

//   // Group images based on current sortBy
//   let grouped = {};
//   if (sortBy === 'location') {
//     grouped = groupBy(images, img => img.location || 'Unknown Location');
//   } else if (sortBy === 'date') {
//     grouped = groupBy(images, img => formatMonthYear(img.date));
//   } else if (sortBy === 'name') {
//     grouped = groupBy(images, img => img.name || 'Unknown Name');
//   }

//   // Sort keys (group headings) alphabetically
//   const sortedGroupKeys = Object.keys(grouped).sort((a, b) =>
//     a.toLowerCase().localeCompare(b.toLowerCase())
//   );

//   return (
//     <div className="bg-white">
//       <div className="p-8 pt-0 text-3xl md:text-8xl">Live Music Illustrations</div>

//       {/* Sort Dropdown */}
//       <div className="px-8">
//         <label className="text-1xl">Sort by:</label>
//         <select
//           value={sortBy}
//           onChange={handleSortChange}
//           className="border border-black px-2 py-1 text-sm"
//         >
//           <option value="">None</option>
//           <option value="name">Name</option>
//           <option value="location">Location</option>
//           <option value="date">Date</option>
//         </select>
//       </div>

//       <div className="p-8">
//         {sortBy === '' ? (
//           // No grouping, flat list
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//             {images.map(({ id, src, alt }) => (
//               <ImageCard key={id} src={src} alt={alt} />
//             ))}
//           </div>
//         ) : (
//           // Grouped view with headings
//           sortedGroupKeys.map((groupKey) => (
//             <div key={groupKey}>
//               <div className="text-2xl">{groupKey}</div>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//                 {grouped[groupKey].map(({ id, src, alt }) => (
//                   <ImageCard key={id} src={src} alt={alt} />
//                 ))}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default LiveMusicIllustrations;

import React, { useState } from 'react';
import images from './imageData.js'; 
import ImageCard from './ImageCard';

function LiveMusicIllustrations() {
  const [sortBy, setSortBy] = useState('location');

  const handleSortChange = (key) => {
    setSortBy(prev => prev === key ? '' : key); // toggle off if clicked again
  };

  const formatMonthYear = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return 'Unknown Date';
    return date.toLocaleDateString('en-AU', { year: 'numeric', month: 'long' });
  };

  const groupBy = (arr, keyFn) => {
    return arr.reduce((acc, item) => {
      const key = keyFn(item) || 'Unknown';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  };

  let grouped = {};
  if (sortBy === 'location') {
    grouped = groupBy(images, img => img.location || 'Unknown Location');
  } else if (sortBy === 'date') {
    grouped = groupBy(images, img => formatMonthYear(img.date));
  } else if (sortBy === 'name') {
    grouped = groupBy(images, img => img.name || 'Unknown Name');
  }

  const sortedGroupKeys = Object.keys(grouped).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  const toggleOptions = ['name', 'location', 'date'];

  return (
    <div className="bg-white">
      <div className="p-8 pt-0 text-3xl md:text-8xl">Live Music Illustrations</div>

      {/* Toggle Buttons */}
      <div className="px-8 pb-4 space-x-4">
        {toggleOptions.map(option => (
          <button
            key={option}
            onClick={() => handleSortChange(option)}
            className={`border bg-white border-[#000aff] text-[#000aff] p-3 py-1 text-sm rounded 
              ${sortBy === option ? 'bg-[#000aff] text-[white]' : 'bg-[white] text-[#000aff]'}`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-8 space-y-8">
        {sortBy === '' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {images.map(({ id, src, alt }) => (
              <ImageCard key={id} src={src} alt={alt} />
            ))}
          </div>
        ) : (
          sortedGroupKeys.map(groupKey => (
            <div key={groupKey}>
              <div className="text-2xl font-semibold pb-2">{groupKey}</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {grouped[groupKey].map(({ id, src, alt }) => (
                  <ImageCard key={id} src={src} alt={alt} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LiveMusicIllustrations;
