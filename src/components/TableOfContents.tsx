"use client";

import React, { useState, useEffect } from 'react';
import { generateTableOfContents } from '@/lib/client-utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TOCItem[];
  content?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items: propItems, content }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [items, setItems] = useState<TOCItem[]>(propItems || []);
  
  // Generate TOC items from content if provided
  useEffect(() => {
    if (content && !propItems) {
      const generatedItems = generateTableOfContents(content);
      setItems(generatedItems);
    }
  }, [content, propItems]);

  // Track active heading based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .filter(el => el.id);
      
      // Find the heading that's currently at the top of the viewport
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i] as HTMLElement;
        const rect = heading.getBoundingClientRect();
        
        if (rect.top <= 100) { // 100px offset from the top
          setActiveId(heading.id);
          return;
        }
      }
      
      // If no heading is found, set the first one as active
      if (headings.length > 0) {
        setActiveId((headings[0] as HTMLElement).id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll to a heading with enhanced retry mechanism
  const scrollToHeading = (itemId: string, itemText: string) => {
    const findAndScrollToElement = (attempts = 0, maxAttempts = 10) => { // Increased retries
      // Try to find element by ID first
      const element = document.getElementById(itemId);
      
      if (element) {
        // Found the element, scroll to it
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const offset = headerHeight + 20; // Add extra padding
        
        // Get the position
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const targetScrollPosition = absoluteElementTop - offset;

        // Scroll to element
        window.scrollTo({
          top: targetScrollPosition,
          behavior: 'smooth'
        });

        // Update active ID
        setActiveId(itemId);
        
        // Enhanced highlight effect
        element.classList.add('highlight-target');
        setTimeout(() => {
          element.classList.remove('highlight-target');
        }, 2000);
        return; // Successfully found and scrolled
      }
      
      // Try to find element by text content
      if (attempts % 2 === 1) { // Alternate between ID and text search
        const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        // Find a heading with similar text content
        for (const heading of Array.from(allHeadings)) {
          if (heading.textContent?.trim() === itemText.trim()) {
            console.log(`Found heading by text match: ${itemText}`);
            heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setActiveId(itemId); // Still update active state
            
            // Add ID to the element to make future lookups work
            if (!heading.id) {
              heading.id = itemId;
            }
            
            return; // Successfully found and scrolled
          }
        }
      }
      
      // Try fuzzy text match if exact match fails
      if (attempts % 3 === 2) { // Every third attempt
        const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        // Find a heading with similar text content (case-insensitive)
        for (const heading of Array.from(allHeadings)) {
          const headingText = heading.textContent?.trim().toLowerCase() || '';
          const searchText = itemText.trim().toLowerCase();
          
          if (headingText.includes(searchText) || searchText.includes(headingText)) {
            console.log(`Found heading by fuzzy match: ${heading.textContent}`);
            heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setActiveId(itemId);
            return;
          }
        }
      }
      
      if (attempts < maxAttempts) {
        // Not found yet, retry after a delay (increasing delay with more attempts)
        const delay = 100 + (attempts * 50); // Progressive delay
        setTimeout(() => findAndScrollToElement(attempts + 1), delay);
      } else if (!attempts) {
        // Silently fail if we can't find the element after all attempts
        // Only log error in development mode
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Couldn't find heading with ID ${itemId} or text "${itemText}"`);
        }
        
        // As a last resort, just try to get close to the general area
        // Find a nearby heading of the same level
        const level = parseInt(itemId.split('-')[1], 10) || 1;
        const headings = Array.from(document.querySelectorAll(`h${level}`));
        if (headings.length > 0) {
          headings[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    
    // Start the find process
    findAndScrollToElement();
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="table-of-contents sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">목차</h2>
      <nav className="toc-nav">
        <ul className="space-y-1 border-l-2 border-gray-200 dark:border-gray-700">
          {items.map((item, index) => (
            <li
              key={index}
              className={`pl-2 py-1 transition-colors duration-200 ${
                activeId === item.id
                  ? 'border-l-2 border-blue-500 -ml-[2px] text-blue-600 dark:text-blue-400 font-medium'
                  : ''
              }`}
              style={{
                marginLeft: `${(item.level - 1) * 1}rem`,
              }}
            >
              <button
                type="button"
                className={`text-left w-full hover:text-blue-600 dark:hover:text-blue-400 ${
                  activeId === item.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => scrollToHeading(item.id, item.text)}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;