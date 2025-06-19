import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-black">
      {/* Logo */}
      <div className="text-xl font-bold text-white">Resume Maker</div>

      {/* Center Links */}
      <nav className="flex space-x-6 text-sm font-medium text-white">
        <Link to="/services" className="hover:text-gray-500">
          Services <span className="text-xs">▼</span>
        </Link>
        <Link to="/" className="hover:text-gray-500">Home</Link>
        <Link to="/about" className="hover:text-gray-500">About</Link>
        <Link to="/blog" className="hover:text-gray-500">Blog</Link>
        <Link to="/pricing" className="hover:text-gray-500">Pricing</Link>
      </nav>

      {/* Auth Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 border border-white text-white font-semibold rounded hover:bg-gray-500"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-500"
        >
          Get Started
        </Link>
      </div>
    </header>
  )
}
