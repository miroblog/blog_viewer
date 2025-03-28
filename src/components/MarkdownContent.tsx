"use client";

import React, { useEffect, useRef, useState } from 'react';
import { processAssetPaths, generateHeadingId } from '../lib/client-utils';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import VideoPlayer from './VideoPlayer';

// Markdown content component for rendering processed markdown

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isProcessed, setIsProcessed] = useState(false);
  

  
  // Function to check if a URL is a video file
  const isVideoFile = (url: string): boolean => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.wmv', '.flv', '.mkv'];
    return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
  };
  
  // Function to check if link text appears to be a video filename
  const isVideoFilename = (text: string): boolean => {
    if (!text) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.wmv', '.flv', '.mkv'];
    return videoExtensions.some(ext => text.toLowerCase().endsWith(ext));
  };
  
  // Function to resolve relative paths for assets
  const resolveAssetPath = (path: string): string => {
    // If it's already an absolute URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Handle relative paths by ensuring they have a leading slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    
    // Return the normalized path
    return normalizedPath;
  };
  
  useEffect(() => {
    if (!contentRef.current) return;
    
    // Function to find and replace video links with VideoPlayer components
    const replaceVideoLinks = () => {
      if (!contentRef.current) return;
      
      // Find all links in the DOM
      const links = contentRef.current.querySelectorAll('a');
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        const linkText = link.textContent || '';
        
        // Check if this link points to a video file
        const isVideoLink = href && (/\.(mp4|webm|ogg|mov|avi)$/i).test(href);
        
        if (isVideoLink) {
          console.log(`Found video link: ${href}`);
          
          // Create a container for the video player
          const container = document.createElement('div');
          container.className = 'video-container';
          container.dataset.videoSrc = href;
          container.dataset.videoCaption = linkText !== href ? linkText : '';
          
          // Insert the container and remove the link
          const parent = link.parentNode;
          if (parent) {
            parent.replaceChild(container, link);
            
            // Create a video element programmatically
            const video = document.createElement('video');
            video.controls = true;
            video.style.width = '100%';
            video.style.maxHeight = '500px';
            video.style.borderRadius = '0.5rem';
            video.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            video.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            
            // Create a source element
            const source = document.createElement('source');
            const videoPath = href.startsWith('/') ? href : `/${href}`;
            source.src = videoPath;
            
            // Set the correct MIME type based on extension
            const ext = href.split('.').pop()?.toLowerCase() || '';
            source.type = {
              'mp4': 'video/mp4',
              'webm': 'video/webm',
              'ogg': 'video/ogg',
              'mov': 'video/quicktime',
              'avi': 'video/x-msvideo'
            }[ext] || `video/${ext}`;
            
            // Add source and fallback text
            video.appendChild(source);
            video.appendChild(document.createTextNode('Your browser does not support the video tag.'));
            container.appendChild(video);
            
            // Add caption if needed
            if (linkText !== href) {
              const caption = document.createElement('p');
              caption.className = 'video-caption';
              caption.style.textAlign = 'center';
              caption.style.fontSize = '0.875rem';
              caption.style.marginTop = '0.5rem';
              caption.style.color = 'var(--metadata-text)';
              caption.textContent = linkText;
              container.appendChild(caption);
            }
          }
        }
      });
    };
    
    
    // Process markdown links that point to video files and convert them to video elements
    const processVideoLinks = () => {
      if (!contentRef.current) return;
      
      // Find all links in the content
      const links = contentRef.current.querySelectorAll('a');
      console.log(`Found ${links.length} links in content`);
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        const linkText = link.textContent || '';
        
        console.log(`Checking link: text="${linkText}", href="${href}"`);
        
        // Check both href and link text for video extensions
        const isVideoHref = href && isVideoFile(href);
        const isVideoText = isVideoFilename(linkText);
        
        // Skip if neither href nor text indicates a video
        if (!isVideoHref && !isVideoText) {
          console.log('Not a video link, skipping');
          return;
        }
        
        console.log('Detected video link, processing...');
        
        // Get the link text to use as a caption if it's different from the href
        // and doesn't look like a filename itself
        const caption = (!isVideoText && linkText !== href) ? linkText : null;
        
        // Create a video element to replace the link
        const video = document.createElement('video');
        video.controls = true;
        video.style.maxWidth = '100%';
        video.style.height = 'auto';
        video.style.margin = '1.5rem auto';
        video.style.display = 'block';
        video.style.borderRadius = '0.5rem';
        video.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        
        // Set the source to the href of the link, resolving relative paths
        const source = document.createElement('source');
        const resolvedPath = resolveAssetPath(href || '');
        source.src = resolvedPath;
        console.log(`Video source path: ${resolvedPath}`);
        
        // Set MIME type based on extension
        const extension = (href || '').split('.').pop()?.toLowerCase() || '';
        const mimeType = {
          'mp4': 'video/mp4',
          'webm': 'video/webm',
          'ogg': 'video/ogg',
          'mov': 'video/quicktime',
          'avi': 'video/x-msvideo',
          'wmv': 'video/x-ms-wmv',
          'flv': 'video/x-flv',
          'mkv': 'video/x-matroska'
        }[extension] || `video/${extension}`;
        
        source.type = mimeType;
        
        // Add a fallback text
        video.appendChild(source);
        video.appendChild(document.createTextNode('Your browser does not support the video tag.'));
        
        // Add a caption if available
        if (caption) {
          const captionElement = document.createElement('p');
          captionElement.className = 'video-caption';
          captionElement.style.textAlign = 'center';
          captionElement.style.fontSize = '0.875rem';
          captionElement.style.marginTop = '0.5rem';
          captionElement.style.color = 'var(--metadata-text)';
          captionElement.textContent = caption;
          
          // Wrap video and caption in a container
          const container = document.createElement('div');
          container.className = 'video-container';
          container.style.marginBottom = '1.5rem';
          
          // Replace the link with the container containing both video and caption
          const parent = link.parentNode;
          if (parent) {
            container.appendChild(video);
            container.appendChild(captionElement);
            parent.replaceChild(container, link);
            return;
          }
        }
        
        // Replace the link with the video element
        const parent = link.parentNode;
        if (parent) {
          parent.replaceChild(video, link);
        }
      });
    };
    
    
    // Process video elements to make them playable
    const videoElements = contentRef.current.querySelectorAll('video');
    videoElements.forEach(video => {
      video.controls = true;
      video.style.maxWidth = '100%';
      video.style.height = 'auto';
    });
    
    // Process image elements to ensure proper display
    const imageElements = contentRef.current.querySelectorAll('img');
    imageElements.forEach(img => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.objectFit = 'contain';
      img.style.margin = '1rem auto';
      img.style.display = 'block';
      
      // Add error handling for images
      img.onerror = () => {
        console.warn(`Failed to load image: ${img.src}`);
        img.style.border = '1px dashed #ff6b6b';
        img.style.padding = '1rem';
        img.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
      };
    });
    
    // New approach for toggle blocks - completely different implementation
    const processToggleBlocks = () => {
      if (!contentRef.current) return;
      
      // Step 1: Find all code blocks with language-toggle
      const toggleBlocks = contentRef.current.querySelectorAll('pre > code.language-toggle');
      
      if (!toggleBlocks || toggleBlocks.length === 0) return;
      
      toggleBlocks.forEach((toggleBlock) => {
        const preElement = toggleBlock.parentElement;
        if (!preElement || !preElement.parentNode) return;
        
        // Create wrapper container for the toggle block
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'code-toggle-container code-toggle-collapsed';
        
        // Create header for toggle block
        const toggleHeader = document.createElement('div');
        toggleHeader.className = 'code-toggle-header';
        
        // Default toggle icon elements
        const expandIcon = document.createElement('span');
        expandIcon.className = 'toggle-icon-expand';
        expandIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        
        const collapseIcon = document.createElement('span');
        collapseIcon.className = 'toggle-icon-collapse';
        collapseIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
        
        // Default label for the toggle
        const toggleLabel = document.createElement('span');
        toggleLabel.className = 'toggle-label';
        toggleLabel.textContent = 'Toggle Content';
        
        // Get the inner content of the toggle block
        const content = toggleBlock.textContent || '';
        
        // Parse for a title (look for # Title as the first line)
        const lines = content.split('\n');
        let toggleContent = content;
        
        if (lines.length > 0 && lines[0].trim().startsWith('#')) {
          // Extract the title (remove the # symbol)
          const titleLine = lines[0].trim();
          const title = titleLine.replace(/^#+\s*/, '').trim();
          toggleLabel.textContent = title;
          
          // Remove the title line from the content
          toggleContent = lines.slice(1).join('\n');
        }
        
        // Add all elements to the toggle header
        toggleHeader.appendChild(expandIcon);
        toggleHeader.appendChild(collapseIcon);
        toggleHeader.appendChild(toggleLabel);
        
        // Create content container
        const contentContainer = document.createElement('div');
        contentContainer.className = 'code-toggle-content';
        
        // Create new pre and code elements to wrap the content
        const newPre = document.createElement('pre');
        newPre.style.margin = '0';
        
        // Create new toggle content container
        const markdownContent = document.createElement('div');
        markdownContent.className = 'md-toggle-content';
        
        // Process markdown content properly
        // Convert markdown to HTML
        let processedContent = toggleContent;
        
        // Convert headers
        processedContent = processedContent.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, text) => {
          const level = hashes.length;
          return `<h${level}>${text.trim()}</h${level}>`;
        });
        
        // Convert lists
        processedContent = processedContent.replace(/^(\s*)[-*+]\s+(.+)$/gm, '<li>$2</li>');
        processedContent = processedContent.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
        
        // Convert code blocks with proper syntax highlighting
        processedContent = processedContent.replace(/```([a-zA-Z0-9]*)\n([\s\S]*?)\n```/g, (match, lang, code) => {
          // Escape HTML in code content
          const escapedCode = code.replace(/&/g, '&amp;')
                                 .replace(/</g, '&lt;')
                                 .replace(/>/g, '&gt;')
                                 .replace(/"/g, '&quot;')
                                 .replace(/'/g, '&#039;');
          
          return `<pre><code class="language-${lang || 'plaintext'}">${escapedCode}</code></pre>`;
        });
        
        // Convert inline code
        processedContent = processedContent.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Convert links
        processedContent = processedContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        
        // Convert bold and italic
        processedContent = processedContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        processedContent = processedContent.replace(/\*([^*]+)\*/g, '<em>$1</em>');
          
        // Set the processed content
        markdownContent.innerHTML = processedContent;
        contentContainer.appendChild(markdownContent);
        
        // Replace the original pre element with our toggle container
        preElement.parentNode.insertBefore(toggleContainer, preElement);
        toggleContainer.appendChild(toggleHeader);
        toggleContainer.appendChild(contentContainer);
        
        // Remove the original pre element
        preElement.parentNode.removeChild(preElement);
        
        // Add click event to toggle visibility
        toggleHeader.addEventListener('click', () => {
          toggleContainer.classList.toggle('code-toggle-collapsed');
        });
      });
    };
    
    // Process headings (add IDs and anchors)
    const processHeadings = () => {
      if (!contentRef.current) return;
      
      const headingElements = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headingElements.forEach(heading => {
        // Add ID if it doesn't exist or fix invalid IDs
        if ((!heading.id || heading.id.trim() === '') && contentRef.current) {
          const text = heading.textContent || '';
          const level = parseInt(heading.tagName.charAt(1), 10);
          const index = Array.from(contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6')).indexOf(heading);
          
          // Use the same ID generation logic as TOC
          const id = generateHeadingId(text, level, index);
          heading.id = id;
        }
        
        // Add hover effect for better UX
        heading.classList.add('heading-anchor-target');
        
        // Create anchor link for easy copying
        const anchor = document.createElement('a');
        anchor.className = 'heading-anchor';
        anchor.href = `#${heading.id}`;
        anchor.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>';
        anchor.style.opacity = '0';
        anchor.style.paddingLeft = '0.5rem';
        anchor.style.position = 'relative';
        
        // Only show anchor on hover
        heading.addEventListener('mouseenter', () => {
          anchor.style.opacity = '0.5';
        });
        heading.addEventListener('mouseleave', () => {
          anchor.style.opacity = '0';
        });
        
        heading.appendChild(anchor);
      });
    };
    
    // Run all the processing functions
    const runProcessingFunctions = async () => {
      if (!contentRef.current || isProcessed) return;

      try {
        // Process video links first to convert them to video elements
        processVideoLinks();
        
        // Process headings
        processHeadings();
        
        // Process toggle blocks (new approach)
        processToggleBlocks();

        // Replace video links with actual video players
        replaceVideoLinks();

        // Mermaid diagram processing has been removed to reduce bundle size

        // Mark as processed to avoid reprocessing
        setIsProcessed(true);
      } catch (error) {
        console.error('Error processing markdown content:', error);
      }
    };
    
    // Run all processing with a small delay to ensure the DOM is ready
    setTimeout(runProcessingFunctions, 100);
    
  }, [content]);

  // Process asset paths to ensure they're correctly referenced
  const processedContent = processAssetPaths(content);

  return (
    <div
      ref={contentRef}
      className="markdown-content"
      style={{ color: 'var(--markdown-text)' }}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default MarkdownContent;