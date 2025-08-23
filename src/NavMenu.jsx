// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import briefcase from "./CharlieBriefcase.svg";
// import cupboardOpen from "./CharlieCupboardOpen.svg";
// import cupboardClosed from "./CharlieCupboardClosed.svg";

// function NavMenu({ onShuffle, onResetStory }) {
//   const [isOpen, setIsOpen] = useState(false); // main cupboard
//   const [openChild, setOpenChild] = useState(null); // tracks which child is open: "live" or "writings"

//   const handleChildToggle = (child) => {
//     setOpenChild(prev => (prev === child ? null : child));
//   };

//   const handleCupboardToggle = (e) => {
//     const open = e.target.open;
//     setIsOpen(open);

//     if (!open) {
//       setOpenChild(null); // close all children when cupboard closes
//     }
//   };

//   return (
//     <div className="p-8 bg-white">
//       <Link
//         to="/"
//         className="pt-0 md:pt-4 flex justify-start items-start text-1xl md:text-3xl underline select-none"
//         style={{ fontWeight: 'bold', fontStyle: 'italic', cursor: 'pointer' }}
//         onClick={onShuffle}
//       >
//         charlie anne paino
//       </Link>

//       <br />
//       <details
//         className="text-1xl"
//         open={isOpen}
//         onToggle={handleCupboardToggle}
//       >
//         <summary className="cursor-pointer flex items-center gap-2 select-none">
//           <img
//             src={isOpen ? cupboardOpen : cupboardClosed}
//             alt="cupboard"
//             className="w-10 h-10 transition-transform duration-200 summary-icon"
//           />
//           open my cupboards
//         </summary>

//         <ul className="ml-6 mt-2 space-y-1 list-disc">
//           {/* Live Illustrations */}
//           <details
//             className="text-1xl"
//             open={openChild === 'live'}
//             onToggle={(e) => {
//               e.stopPropagation();
//               handleChildToggle('live');
//             }}
//           >
//             <summary className="cursor-pointer flex items-center gap-2 select-none">
//               <img
//                 src={briefcase}
//                 alt="briefcase"
//                 className={`w-4 h-4 transition-transform duration-200 ${
//                   openChild === 'live' ? "rotate-90" : ""
//                 }`}
//               />
//               live illustrations
//             </summary>
//             <ul className="ml-6 mt-2 space-y-1">
//               <li className="ml-6">
//                 <Link to="/live" className="underline hover:no-underline">
//                   2022-2023
//                 </Link>
//               </li>
//             </ul>
//           </details>

//           {/* Writings */}
//           <details
//             className="text-1xl"
//             open={openChild === 'writings'}
//             onToggle={(e) => {
//               e.stopPropagation();
//               handleChildToggle('writings');
//             }}
//           >
//             <summary className="cursor-pointer flex items-center gap-2 select-none">
//               <img
//                 src={briefcase}
//                 alt="briefcase"
//                 className={`w-4 h-4 transition-transform duration-200 ${
//                   openChild === 'writings' ? "rotate-90" : ""
//                 }`}
//               />
//               writings
//             </summary>
//             <ul className="ml-6 mt-2 space-y-1">
//               <li className="ml-6">
//                 <Link to="/writings" className="underline hover:no-underline">
//                   writings
//                 </Link>
//               </li>
//             </ul>
//           </details>
//         </ul>
//       </details>
//     </div>
//   );
// }

// export default NavMenu;


// 

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import briefcase from "./CharlieBriefcase.svg";
import cupboardOpen from "./CharlieCupboardOpen.svg";
import cupboardClosed from "./CharlieCupboardClosed.svg";

function NavMenu({ onShuffle, onResetStory }) {
  const location = useLocation();


  // Update open states based on current path
  // useEffect(() => {
  //   if (location.pathname.startsWith('/live')) {
  //     setIsOpen(true);
  //     setOpenChild('live');
  //   } else if (location.pathname.startsWith('/writings')) {
  //     setIsOpen(true);
  //     setOpenChild('writings');
  //   } else {
  //     // default: cupboard closed
  //     setIsOpen(false);
  //     setOpenChild(null);
  //   }
  // }, [location.pathname]);


  const initialOpenState = location.pathname.startsWith('/live') ? true
                        : location.pathname.startsWith('/writings') ? true
                        : false;

  const initialChild = location.pathname.startsWith('/live') ? 'live'
                    : location.pathname.startsWith('/writings') ? 'writings'
                    : null;

  const [isOpen, setIsOpen] = useState(initialOpenState);
  const [openChild, setOpenChild] = useState(initialChild);


  const handleChildClick = (child) => {
    setOpenChild(prev => (prev === child ? null : child));
  };

  return (
    <div className="p-8 bg-white">
      <Link
        to="/"
        className="pt-0 md:pt-4 flex justify-start items-start text-1xl md:text-3xl underline select-none"
        style={{ fontWeight: 'bold', fontStyle: 'italic', cursor: 'pointer' }}
        onClick={() => {
          onShuffle();
          setIsOpen(false);
          setOpenChild(null);
        }}
      >
        charlie anne paino
      </Link>

      <br />

      {/* Cupboard toggle */}
      <div className="text-1xl">
        <div
          className="cursor-pointer flex items-center gap-2 select-none"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <img
            src={isOpen ? cupboardOpen : cupboardClosed}
            alt="cupboard"
            className="w-10 h-10 transition-transform duration-200 summary-icon"
          />
          open my cupboards
        </div>

        {isOpen && (
          <ul className="ml-6 mt-2 space-y-1 list-disc">
            {/* Live Illustrations */}
            <div>
              <div
                className="cursor-pointer flex items-center gap-2 select-none pt-1 pb-1 md:pt-0 md:pb-0"
                onClick={() => handleChildClick('live')}
              >
                <img
                  src={briefcase}
                  alt="briefcase"
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openChild === 'live' ? 'rotate-90' : ''
                  }`}
                />
                live illustrations
              </div>
              {openChild === 'live' && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li className="ml-6">
                    <Link to="/live" className="underline hover:no-underline">
                      2022-2023
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Writings */}
            <div>
              <div
                className="cursor-pointer flex items-center gap-2 select-none pt-1 pb-1 md:pt-0 md:pb-0"
                onClick={() => handleChildClick('writings')}
              >
                <img
                  src={briefcase}
                  alt="briefcase"
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openChild === 'writings' ? 'rotate-90' : ''
                  }`}
                />
                writings
              </div>
              {openChild === 'writings' && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li className="ml-6">
                    <Link to="/writings" className="underline hover:no-underline">
                      writings
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}

export default NavMenu;
