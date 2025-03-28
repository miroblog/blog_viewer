"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <Image
              src="/images/hyperithm_footer_logo.png"
              alt="Hyperithm Logo"
              width={180}
              height={50}
              className="h-12 w-auto mb-4 object-contain"
              style={{ maxWidth: '180px' }}
            />
            <p className="text-gray-400 mt-3 text-sm font-medium">
              Digital Asset Gateway for Institutions
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-bold mb-4 uppercase tracking-tight">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://www.hyperithm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="https://hyperithm.career.greetinghr.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-bold mb-4 uppercase tracking-tight">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@hyperithm.com" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  info@hyperithm.com
                </a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <a href="https://www.hyperithm.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
                  www.hyperithm.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-900 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p className="text-sm font-medium">© {currentYear} Hyperithm Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;