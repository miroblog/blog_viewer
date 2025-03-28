import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link 
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}