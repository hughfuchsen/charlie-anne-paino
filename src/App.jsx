import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
// import Navbar from './components/Navbar'

function App() {

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
