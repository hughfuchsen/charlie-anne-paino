// import React from 'react';
// import { Link } from 'react-router-dom';
// import briefcase from "./CharlieBriefcase.svg";
// import cupboardOpen from "./CharlieCupboardOpen.svg";
// import cupboardClosed from "./CharlieCupboardClosed.svg";

// function NavMenu({ onShuffle, onResetStory }) {
//   return (
//     <div className="p-8 bg-[white]">
//       <Link
//         to="/"
//         className="pt-0 md:pt-4 flex justify-start items-start text-1xl md:text-3xl underline select-none"
//         style={{ fontWeight: 'bold', fontStyle: 'italic', cursor: 'pointer' }}
//         onClick={onShuffle}
//       >
//         charlie anne paino
//       </Link>

//       <br />
//       <details className="text-1xl">
//         <summary className="cursor-pointer flex items-center gap-2 select-none">
//           {/* Hide the default disclosure marker */}
//         <img src={cupboardClosed} alt="cupboard" className="w-10 h-10 transition-transform duration-200 summary-icon" />
//           open my cupboards
//         </summary>
//         <ul className="ml-6 mt-2 space-y-1 list-disc">
//             {/* <Link to="/live" className="underline hover:no-underline"> */}
//             <details className="text-1xl">
//               <summary className="cursor-pointer flex items-center gap-2 select-none">
//                 <img src={briefcase} alt="briefcase"   className="w-4 h-4 transition-transform duration-200 [details[open]&]:rotate-90 summary-icon"/>
//                   Live Illustrations
//                 </summary>             
//              </details>
//             {/* </Link> */}
//           <li>
//             <Link
//               to="/writings"
//               className="underline hover:no-underline"
//               onClick={onResetStory}
//             >
//               Writings
//             </Link>
//           </li>
//         </ul>
//       </details>

//     </div>
//   );
// }

// export default NavMenu;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import briefcase from "./CharlieBriefcase.svg";
import cupboardOpen from "./CharlieCupboardOpen.svg";
import cupboardClosed from "./CharlieCupboardClosed.svg";

function NavMenu({ onShuffle, onResetStory }) {
  const [isOpen, setIsOpen] = useState(false); // tracks the main cupboard

  return (
    <div className="p-8 bg-white">
      <Link
        to="/"
        className="pt-0 md:pt-4 flex justify-start items-start text-1xl md:text-3xl underline select-none"
        style={{ fontWeight: 'bold', fontStyle: 'italic', cursor: 'pointer' }}
        onClick={onShuffle}
      >
        charlie anne paino
      </Link>

      <br />
      <details
        className="text-1xl"
        open={isOpen}
        onToggle={(e) => setIsOpen(e.target.open)} // updates state when clicked
      >
        <summary className="cursor-pointer flex items-center gap-2 select-none">
          <img
            src={isOpen ? cupboardOpen : cupboardClosed}
            alt="cupboard"
            className="w-10 h-10 transition-transform duration-200 summary-icon"
          />
          open my cupboards
        </summary>

        <ul className="ml-6 mt-2 space-y-1 list-disc">
          <details className="text-1xl">
            <summary className="cursor-pointer flex items-center gap-2 select-none">
              <img
                src={briefcase}
                alt="briefcase"
                className="w-4 h-4 transition-transform duration-200 [details[open]&]:rotate-90 summary-icon"
              />
              Live Illustrations
            </summary>
            <ul>
            <li>hi</li>
            </ul>
          </details>

          <li>
            <Link
              to="/writings"
              className="underline hover:no-underline"
              onClick={onResetStory}
            >
              Writings
            </Link>
          </li>
        </ul>
      </details>
    </div>
  );
}

export default NavMenu;
