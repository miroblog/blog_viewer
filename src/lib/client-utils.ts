"use client";

// Process video and image paths in HTML content
export function processAssetPaths(content: string): string {
  // First, convert markdown video links to HTML5 video elements
  // Pattern: [filename.mp4](/path/to/video.mp4) or [any text](/path/to/video.mp4)
  let processedContent = content.replace(
    /\[([^\]]+)\]\(([^)]+\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv))\)/gi,
    (match, text, url, ext) => {
      // Extract the path and ensure it starts with a slash
      const videoPath = url.startsWith('/') ? url : `/${url}`;
      const caption = text.endsWith(`.${ext.toLowerCase()}`) ? '' : `<p class="video-caption">${text}</p>`;
      
      // Create an HTML5 video element
      return `<div class="video-container"><video controls><source src="${videoPath}" type="video/${ext.toLowerCase()}">Your browser does not support the video tag.</video>${caption}</div>`;
    }
  );
  
  // Replace image paths to ensure they're properly referenced
  processedContent = processedContent.replace(
    /src="\/([^"]+)"/g,
    (match, p1) => {
      // Make sure the path starts with a slash
      return `src="/${p1.replace(/^\/+/, '')}"`;
    }
  );
  
  // Replace video paths
  processedContent = processedContent.replace(
    /<video[^>]*src="\/([^"]+)"[^>]*>/g,
    (match, p1) => {
      // Make sure the path starts with a slash and add controls attribute if missing
      const path = p1.replace(/^\/+/, '');
      if (!match.includes('controls')) {
        return match.replace(`src="/${p1}"`, `src="/${path}" controls`);
      }
      return match.replace(`src="/${p1}"`, `src="/${path}"`);
    }
  );
  
  return processedContent;
}

// Helper function to generate consistent heading IDs
export function generateHeadingId(text: string, level?: number, index?: number): string {
  // Remove HTML tags and trim
  const cleanText = text.replace(/<[^>]*>/g, '').trim();
  
  // Generate base ID
  let id = cleanText
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/^[^a-z]+/g, '') // Ensure starts with letter
    .replace(/-+$/g, ''); // Remove trailing hyphens
  
  // If empty or invalid, generate a fallback
  if (!id) {
    id = `heading-${level || ''}${index !== undefined ? `-${index}` : ''}`;
  }
  
  return id;
}

// Generate table of contents from HTML content
export function generateTableOfContents(content: string): { id: string; text: string; level: number }[] {
  const toc: { id: string; text: string; level: number }[] = [];
  const headingRegex = /<h([1-6])[^>]*(?:id="([^"]+)")?[^>]*>(.*?)<\/h\1>/g;
  let processedContent = content;
  
  // First pass: collect all headings and generate IDs
  const headings = Array.from(content.matchAll(headingRegex));
  
  headings.forEach((match, index) => {
    const level = parseInt(match[1], 10);
    const existingId = match[2];
    const text = match[3].replace(/<[^>]*>/g, '');
    
    // Generate or use existing ID
    const id = existingId || generateHeadingId(text, level, index);
    
    // Replace heading with ID if it doesn't have one
    if (!existingId) {
      const originalHeading = match[0];
      const newHeading = originalHeading.replace(
        new RegExp(`<h${level}`),
        `<h${level} id="${id}"`
      );
      processedContent = processedContent.replace(originalHeading, newHeading);
    }
    
    toc.push({ id, text, level });
  });
  
  return toc;
}