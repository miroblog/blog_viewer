"use client";

import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

// Define the PostMetadata interface here since we can't import it from the server-side utility
interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  authorImage: string;
  authorBio: string;
  slug: string;
}

interface PostHeaderProps {
  metadata: PostMetadata;
}

const PostHeader: React.FC<PostHeaderProps> = ({ metadata }) => {
  const formattedDate = format(new Date(metadata.date), 'MMMM dd, yyyy');

  return (
    <div className="mb-8">
      <div className="relative w-full h-64 md:h-96 mb-6">
        <Image
          src={metadata.coverImage}
          alt={metadata.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{metadata.title}</h1>
      
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 mr-4">
          <Image
            src={metadata.authorImage}
            alt={metadata.author}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-black dark:text-white">{metadata.author}</p>
          <p className="text-sm" style={{ color: 'var(--metadata-text)' }}>{metadata.authorBio}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center text-sm" style={{ color: 'var(--metadata-text)' }}>
        <span className="mr-4">{formattedDate}</span>
        <span className="mr-4">•</span>
        <span className="mr-4">Category: {metadata.category}</span>
        <span className="mr-4">•</span>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          {metadata.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 rounded-md text-xs font-medium"
              style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;