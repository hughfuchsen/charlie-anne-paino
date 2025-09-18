
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Writings from './Writings';
import LiveIllustrations from './LiveIllustrations';
import LiveIllustrations2025 from './LiveIllustrations2025';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writings" element={<Writings />} />
        <Route path="/live" element={<LiveIllustrations />} />
        <Route path="/live-2025" element={<LiveIllustrations2025 />} />
      </Routes>
    </div>
  );
}
