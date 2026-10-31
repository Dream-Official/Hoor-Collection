'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#D4AF37]/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile hamburger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-[#D4AF37] focus:outline-none"
              aria-label="Toggle Navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Gold Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-[#D4AF37] group-hover:text-[#f4e0ae] transition-colors">
              HOOR
            </span>
            <span className="text-[0.6rem] tracking-[0.35em] text-white uppercase -mt-1 group-hover:text-[#D4AF37] transition-colors">
              COLLECTION
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">
              Home
            </Link>
            <Link href="/#listing" className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">
              Creations
            </Link>
            <Link href="/#lookbook" className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">
              Lookbook
            </Link>
            <Link href="/#about" className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">
              The Atelier
            </Link>
            <Link href="/#contact" className="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">
              Concierge
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/923160010301?text=Hello%20Hoor%20Collection!%20I%20would%20like%20to%20inquire%20about%20your%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#f4e0ae] rounded transition-all shadow-md"
            >
              VIP Concierge
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
