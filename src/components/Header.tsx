"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <span className="font-bold text-xl tracking-tight">HYPERITHM<sup>®</sup> Tech Blog</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link
                href="https://www.hyperithm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="https://hyperithm.career.greetinghr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                Careers
              </Link>
              <Link
                href="https://www.linkedin.com/company/hyperithm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                LinkedIn
              </Link>
            </nav>
            
            <ThemeToggle />
            
            <div className="md:hidden">
              {/* Mobile menu button - can be expanded later */}
              <button className="text-white hover:text-gray-300 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;