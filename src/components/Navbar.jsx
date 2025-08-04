import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow px-4 py-2">
      <div className="max-w-6xl mx-auto flex justify-end items-center">
        <Link to="/" className="text-xl font-bold text-600">
          CHRIS LEGO
        </Link>
      </div>
    </nav>
  )
}


export default Navbar
