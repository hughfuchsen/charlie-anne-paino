
// import React from 'react'
// import { Routes, Route } from 'react-router-dom';
// import Home from './Home';
// import Writings from './Writings';
// import LiveIllustrations2022_2023 from './LiveIllustrations2022_2023';
// import LiveIllustrations2025 from './LiveIllustrations2025';

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/writings" element={<Writings />} />
//         <Route path="/live-2022_2023" element={<LiveIllustrations2022_2023 />} />
//         <Route path="/live-2025" element={<LiveIllustrations2025 />} />
//       </Routes>
//     </div>
//   );
// }

import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Writings from './Writings';
import Drawings from './Drawings';
import AboutMe from './AboutMe';
import LiveIllustrations from './LiveIllustrations';

const hardcoded2022_2023 = [
  'propaine',
  'gut health',
  'brit wynne',
  'the night cat',
  'bench press',
  "dr sure's unusual practice",
  'carpet burn',
  'bird pop',
  'the sunken sea',
  'the mirrors',
  'sunny and her band'
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writings" element={<Writings />} />
        <Route path="/live" element={<LiveIllustrations years={[2022, 2023, 2025]} hardcodedOrder={hardcoded2022_2023}/>} />
        <Route path="/live-2022_2023" element={<LiveIllustrations years={[2022, 2023]} hardcodedOrder={hardcoded2022_2023}/>} />
        <Route path="/live-2025" element={<LiveIllustrations years={[2025]}/>} />
        <Route path="/drawings" element={<Drawings />} />
        <Route path="/about-me" element={<AboutMe />} />
      </Routes>
    </div>
  );
}
