import React from 'react'
import donLOGO from '/src/assets/donLogo.svg' // adjust path if needed


function Home() {
  return (
    <div className="p-8 min-h-screen bg-gray-100 flex justify-center">
      <div className="grid grid-cols-3 gap-8 w-full max-w-6xl">
        
        {/* Left column with SVG and text */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <img src={donLOGO} alt="DON Logo" className="w-3/4 h-auto" />
        </div>
  
        {/* Middle column */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">Item {i}</h2>
              <p className="text-gray-600">Info {i}.</p>
            </div>
          ))}
        </div>
  
        {/* Right column */}
        <div className="space-y-1">
          {['A', 'B', 'C', 'D', 'E'].map((label) => (
            <div key={label} className="bg-white p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">Item {label}</h2>
              <p className="text-gray-600">Info {label}.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}  

export default Home
