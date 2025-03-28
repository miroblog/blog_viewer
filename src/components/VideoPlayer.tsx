"use client";

import React, { useState, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  caption?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, caption }) => {
  const [videoPath, setVideoPath] = useState(src);
  
  useEffect(() => {
    // Ensure the path is properly formatted
    if (!src.startsWith('http') && !src.startsWith('/')) {
      setVideoPath(`/${src}`);
    }
  }, [src]);
  
  // Get the file extension to set the correct MIME type
  const fileExtension = src.split('.').pop()?.toLowerCase() || '';
  const mimeType = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'mov': 'video/quicktime',
    'avi': 'video/x-msvideo',
  }[fileExtension] || `video/${fileExtension}`;
  
  return (
    <div className="video-container" style={{ marginBottom: '1.5rem' }}>
      <video 
        controls 
        style={{
          width: '100%',
          maxHeight: '500px',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <source src={videoPath} type={mimeType} />
        Your browser does not support the video tag.
      </video>
      
      {caption && (
        <p className="video-caption" style={{
          textAlign: 'center',
          fontSize: '0.875rem',
          marginTop: '0.5rem',
          color: 'var(--metadata-text)'
        }}>
          {caption}
        </p>
      )}
    </div>
  );
};

export default VideoPlayer;
