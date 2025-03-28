import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
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

// Get all markdown files from the directory
export function getMarkdownFiles(): string[] {
  return fs.readdirSync(mdDirectory).filter(file => file.endsWith('.md'));
}

// Get all posts with metadata
export function getAllPosts(): PostMetadata[] {
  const files = getMarkdownFiles();
  
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
export async function getPostBySlug(slug: string): Promise<{ metadata: PostMetadata; content: string }> {
  const fullPath = path.join(mdDirectory, `${slug}.md`);
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
}

// Process video and image paths in HTML content
export function processAssetPaths(content: string): string {
  // Replace image paths
  let processedContent = content.replace(
    /src="\/([^"]+)"/g, 
    'src="/$1"'
  );
  
  // Replace video paths
  processedContent = processedContent.replace(
    /<video[^>]*src="\/([^"]+)"[^>]*>/g,
    (match, p1) => {
      return match.replace(`src="/${p1}"`, `src="/${p1}"`);
    }
  );
  
  return processedContent;
}

// Generate table of contents from HTML content
export function generateTableOfContents(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /<h([1-6])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/g;
  const toc: { id: string; text: string; level: number }[] = [];
  
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    // Remove HTML tags from heading text
    const text = match[3].replace(/<[^>]*>/g, '');
    
    toc.push({ id, text, level });
  }
  
  return toc;
}