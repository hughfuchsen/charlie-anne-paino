// import React, { useEffect } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './Home'
// // import Navbar from './components/Navbar'

// function App() {

//   useEffect(() => {
//     window.scrollTo(0,0);
//   }, []);

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         {/* <Navbar /> */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </div>
//     </Router>
//   )
// }

// export default App

// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './Home';
// import LiveMusicIllustrations from './LiveMusicIllustrations';
// import Writings from './Writings';

// function App() {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* <Navbar /> */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/live" element={<LiveMusicIllustrations />} />
//         <Route path="/writings" element={<Writings />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Writings from './Writings';
import LiveMusicIllustrations from './LiveMusicIllustrations';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writings" element={<Writings />} />
        <Route path="/live" element={<LiveMusicIllustrations />} />
      </Routes>
    </div>
  );
}
