import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

// Define the directory where markdown files are stored
const mdDirectory = path.join(process.cwd(), 'md_files');

// Define the type for post metadata
export interface PostMetadata {
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

export interface PostData {
  metadata: PostMetadata;
  content: string;
}

// Get all post slugs
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(mdDirectory).filter(file => file.endsWith('.md'));
  
  return fileNames.map(fileName => {
    return {
      slug: fileName.replace(/\.md$/, '')
    };
  });
}

// Get all posts metadata
export function getAllPosts() {
  // Get all markdown files from the directory
  const files = fs.readdirSync(mdDirectory).filter(file => file.endsWith('.md'));
  
  const posts = files.map(filename => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(mdDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      ...(data as Omit<PostMetadata, 'slug'>),
      slug,
    };
  });
  
  // Sort posts by date in descending order
  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

// Get a specific post by slug
export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(mdDirectory, `${slug}.md`);
    
    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);
    
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(remarkGfm) // GitHub Flavored Markdown
      .use(remarkRehype, { allowDangerousHtml: true }) // Convert to rehype AST with HTML passthrough
      .use(rehypeHighlight) // Syntax highlighting
      .use(rehypeStringify, { allowDangerousHtml: true }) // Convert to HTML string
      .process(content);
      
    const contentHtml = processedContent.toString();
    
    // Return the metadata and content
    return {
      metadata: {
        ...(data as Omit<PostMetadata, 'slug'>),
        slug,
      },
      content: contentHtml,
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
