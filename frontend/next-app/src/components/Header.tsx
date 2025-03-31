'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold">
          <Link href="/" className="hover:text-gray-300">
            MyWebsite
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/chat" className="hover:text-gray-300">
            Chat
          </Link>
          <Link href="/todo" className="hover:text-gray-300">
            Todo
          </Link>
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-blue-600`}
      >
        <nav className="flex flex-col items-center space-y-4 py-4">
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link href="/chat" className="text-white hover:text-gray-300">
            Chat
          </Link>
          <Link href="/todo" className="text-white hover:text-gray-300">
            Todo
          </Link>
        </nav>
      </div>
    </header>
  );
}
