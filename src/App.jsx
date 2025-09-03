
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Writings from './Writings';
import LiveIllustrations from './LiveIllustrations';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writings" element={<Writings />} />
        <Route path="/live" element={<LiveIllustrations />} />
      </Routes>
    </div>
  );
}
