// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import briefcase from "./CharlieBriefcase.svg";
// import cupboardOpen from "./CharlieCupboardOpen.svg";
// import cupboardClosed from "./CharlieCupboardClosed.svg";

// function NavMenu({ onShuffle, onResetStory }) {
//   const location = useLocation();
//   const isSubWriting = location.pathname.startsWith('/writings/') && location.pathname !== '/writings';


//   const initialOpenState = location.pathname.startsWith('/live') ? true
//                         : location.pathname.startsWith('/writings') ? true
//                         : false;

//   const initialChild = location.pathname.startsWith('/live-2022_2023') ? 'live-2022_2023'
//                     : location.pathname.startsWith('/live-2025') ? 'live-2025'
//                     : location.pathname.startsWith('/writings') ? 'writings'
//                     : null;

//   const [isOpen, setIsOpen] = useState(initialOpenState);
//   const [openChild, setOpenChild] = useState(initialChild);

  

//   const handleChildClick = (child) => {
//     setOpenChild(prev => (prev === child ? null : child));
//   };

//   return (
//     <div className="p-8 bg-white">
//       <Link
//         to="/"
//         className="pt-0 md:pt-4 flex justify-start items-start text-1xl md:text-3xl underline select-none"
//         style={{ fontWeight: 'bold', fontStyle: 'italic', cursor: 'pointer' }}
//         onClick={() => {
//           onShuffle();
//           setIsOpen(false);
//           setOpenChild(null);
//         }}
//       >
//         charlie anne paino
//       </Link>

//       <br />

//       {/* Cupboard toggle */}
//       <div className="text-1xl">
//         <div
//           className="cursor-pointer flex items-center gap-2 select-none"
//           onClick={() => setIsOpen(prev => !prev)}
//         >
//           <img
//             src={isOpen ? cupboardOpen : cupboardClosed}
//             alt="cupboard"
//             className="w-10 h-10 transition-transform duration-200 summary-icon"
//           />
//           open my cupboards
//         </div>

//         {isOpen && (
//           <ul className="ml-6 mt-2 space-y-1 list-disc">
//             {/* Live Illustrations */}
//             <div>
//               <div
//                 className="cursor-pointer flex items-center gap-2 select-none pt-4 pb-4 md:pt-0 md:pb-0"
//                 onClick={() => handleChildClick('live')}
//               >
//                 <img
//                   src={briefcase}
//                   alt="briefcase"
//                   className={`w-4 h-4 transition-transform duration-200 ${
//                     openChild === 'live' ? 'rotate-90' : ''
//                   }`}
//                 />
//                 live illustrations
//               </div>
//               {openChild === 'live' && (
//                 <ul className="ml-6 mt-2 space-y-1">
//                   <li className="ml-6 pb-4 md:pt-0 md:pb-0">
//                     <Link to="/live-2022_2023" className="underline hover:no-underline">
//                       2022-2023
//                     </Link>
//                   </li>
//                   <li className="ml-6 pb-4 md:pt-0 md:pb-0">
//                     <Link to="/live-2025" className="underline hover:no-underline">
//                       2025
//                     </Link>
//                   </li>               
//                 </ul>
//               )}
//             </div>

//             {/* Writings */}
//             <div>
//               <div
//                 className="cursor-pointer flex items-center gap-2 select-none pt-4 pb-4 md:pt-0 md:pb-0"
//                 onClick={() => handleChildClick('writings')}
//               >
//                 <img
//                   src={briefcase}
//                   alt="briefcase"
//                   className={`w-4 h-4 transition-transform duration-200 ${
//                     openChild === 'writings' ? 'rotate-90' : ''
//                   }`}
//                 />
//                 writings
//               </div>
//               {openChild === 'writings' && (
//                 <ul className="ml-6 mt-2 space-y-1">
//                   <li className="ml-6 pb-4 md:pt-0 md:pb-0">
//                   <Link
//                     to="/writings"
//                     className="underline hover:no-underline"
//                     onClick={() => {
//                       onResetStory(); // resets selectedId to null
//                       setOpenChild('writings'); // keeps cupboard open
//                     }}
//                   >
//                     writings
//                   </Link>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default NavMenu;


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import briefcase from "./CharlieBriefcase.svg";
import cupboardOpen from "./CharlieCupboardOpen.svg";
import cupboardClosed from "./CharlieCupboardClosed.svg";

function NavMenu({ onShuffle, onResetStory }) {
  const location = useLocation();

  // Drawer open state
  const [isOpen, setIsOpen] = useState(() =>
    location.pathname.startsWith('/live') || location.pathname.startsWith('/writings' || location.pathname.startsWith('/about-me') )
  );

  // Which child drawer is open
  const [openChild, setOpenChild] = useState(() => {
    if (location.pathname.startsWith('/live-2022_2023') || location.pathname.startsWith('/live-2025')|| location.pathname.startsWith('/live')) return 'live';
    if (location.pathname.startsWith('/writings')) return 'writings';
    if (location.pathname.startsWith('/drawings')) return 'drawings';
    if (location.pathname.startsWith('/about-me')) return 'about-me';
    return null;
  });

  // Keep drawer state in sync if user navigates directly
  useEffect(() => {
    if (location.pathname.startsWith('/live-2022_2023') || location.pathname.startsWith('/live-2025')) {
      setIsOpen(true);
      setOpenChild('live');
    } else if (location.pathname.startsWith('/writings')) {
      setIsOpen(true);
      setOpenChild('writings');
    } else if (location.pathname.startsWith('/drawings')) {
      setIsOpen(true);
      setOpenChild('drawings');
    } else if (location.pathname.startsWith('/about-me')) {
      setIsOpen(true);
      setOpenChild('about-me');
    } else {
      setOpenChild(null);
    }
  }, [location.pathname]);

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
                className="cursor-pointer flex items-center gap-2 select-none pt-4 pb-4 md:pt-0 md:pb-0"
                onClick={() => handleChildClick('live')}
              >
                <img
                  src={briefcase}
                  alt="briefcase"
                  className={`w-4 h-4 transition-transform duration-200 ${openChild === 'live' ? 'rotate-90' : ''}`}
                />
                live illustrations
              </div>
              {openChild === 'live' && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li className="ml-6 pb-4 md:pt-0 md:pb-0">
                    <Link to="/live-2022_2023" className="underline hover:no-underline">
                      2022-2023
                    </Link>
                  </li>
                  <li className="ml-6 pb-4 md:pt-0 md:pb-0">
                    <Link to="/live-2025" className="underline hover:no-underline">
                      2025
                    </Link>
                  </li>                                        
                </ul>
              )}
            </div>

            {/* Writings */}
            <div>
              <div
                className="cursor-pointer flex items-center gap-2 select-none pt-4 pb-4 md:pt-0 md:pb-0"
                onClick={() => handleChildClick('writings')}
              >
                <img
                  src={briefcase}
                  alt="briefcase"
                  className={`w-4 h-4 transition-transform duration-200 ${openChild === 'writings' ? 'rotate-90' : ''}`}
                />
                {/* // go straight to it unless charlie wants to categorise... then use the open briefcase vibe.
                // same goes for drawings or any other link with only one category option */}
                <Link
                      to="/writings"
                      className=""
                      onClick={() => onResetStory()}
                    >
                      writings
                </Link>
              </div>
              {/* {openChild === 'writings' && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li className="ml-6 pb-4 md:pt-0 md:pb-0">
                    <Link
                      to="/writings"
                      className="underline hover:no-underline"
                      onClick={() => onResetStory()}
                    >
                      writings
                    </Link>
                  </li>
                </ul>
              )} */}
            </div>
            
            {/* Drawings */}
            <div>
              <div
                className="cursor-pointer flex items-center gap-2 select-none pt-4 pb-4 md:pt-0 md:pb-0"
                onClick={() => handleChildClick('drawings')}
              >
                <img
                  src={briefcase}
                  alt="briefcase"
                  className={`w-4 h-4 transition-transform duration-200 ${openChild === 'drawings' ? 'rotate-90' : ''}`}
                />
                <Link
                      to="/drawings"
                      className=""
                      onClick={() => onResetStory()}
                    >
                      drawings
                </Link>
              </div>
              {/* {openChild === 'drawings' && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li className="ml-6 pb-4 md:pt-0 md:pb-0">
                    <Link to="/drawings" className="underline hover:no-underline">
                      drawings
                    </Link>
                  </li>   
                </ul>
              )} */}
            </div>
           
            {/* AboutMe */}
            <div>
              <div
                className="cursor-pointer flex items-center gap-2 select-none pt-4 pb-4 md:pt-0 md:pb-0"
                onClick={() => handleChildClick('about-me')}
              >
                <img
                  src={briefcase}
                  alt="briefcase"
                  className={`w-4 h-4 transition-transform duration-200 ${openChild === 'about-me' ? 'rotate-90' : ''}`}
                />
                <Link to="/about-me">
                      about me
                </Link>
              </div>
              {/* {openChild === 'about-me' && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li className="ml-6 pb-4 md:pt-0 md:pb-0">
                    <Link to="/about-me" className="underline hover:no-underline">
                      about me
                    </Link>
                  </li>   
                </ul>
              )} */}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}

export default NavMenu;
