// import React from 'react'
// import LiveMusicIllustrations from './LiveMusicIllustrations'
// import Writings from './Writings'

// function Home() {
//   return (
//     <>
//       <div className="p-8" 
//       style={{ backgroundColor: "white" }}
//       >
//         <p className="pt-0 md:pt-4 flex justify-start items-start text-1xl md:text-3xl underline" style={{ fontWeight: "bold", fontStyle: "italic" }}>
//         picapsso’s diary 1997</p>
//         <br />
//         <details className="text-1xl">
//           <summary className="cursor-pointer">open my cupboards</summary>
//           <ul className="ml-6 mt-2 space-y-1 list-disc">
//             <li>
//               <p className="underline hover:no-underline">
//                 Live Music Illustrations
//               </p>
//             </li>
//             <li>
//               <p className="underline hover:no-underline">
//                 Writings
//               </p>
//             </li>
//           </ul>
//         </details>

//       </div>

//       <LiveMusicIllustrations/>

//       <Writings/>
//     </>
//   );
// }

// export default Home;


import React, { useState } from 'react';
import LiveMusicIllustrations from './LiveMusicIllustrations';
import Writings from './Writings';

function Home() {
  const [selectedSection, setSelectedSection] = useState(null); // 'live' or 'writings'

  return (
    <>
      <div className="p-8 bg-[white]">
        <p className="pt-0 md:pt-4 flex justify-start items-start text-1xl md:text-3xl underline" style={{ fontWeight: "bold", fontStyle: "italic" }}>
          picapsso’s diary 1997
        </p>
        <br />
        <details className="text-1xl open">
          <summary
            className="cursor-pointer"
            onClick={() => {
              if (selectedSection !== null) setSelectedSection(null);
            }}
          >
            open my cupboards
          </summary>
          <ul className="ml-6 mt-2 space-y-1 list-disc">
            <li>
              <button
                onClick={() => setSelectedSection('live')}
                className="underline hover:no-underline"
              >
                Live Music Illustrations
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection('writings')}
                className="underline hover:no-underline"
              >
                Writings
              </button>
            </li>
          </ul>
        </details>
      </div>

      {selectedSection === 'live' && <LiveMusicIllustrations />}
      {selectedSection === 'writings' && <Writings />}
      {selectedSection === null && (<div className="bg-white min-h-screen" />)}
    </>
  );
}

export default Home;
