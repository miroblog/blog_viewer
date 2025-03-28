import { notFound } from 'next/navigation';
import PostHeader from '@/components/PostHeader';
import MarkdownContent from '@/components/MarkdownContent';
import TableOfContents from '@/components/TableOfContents';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import dynamic from 'next/dynamic';

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

interface PostData {
  metadata: PostMetadata;
  content: string;
}

// Generate static paths at build time
export function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

// Get static props for this page
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  
  // If post doesn't exist, return 404
  if (!post) {
    notFound();
  }
  
  // We'll generate table of contents on the client side

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <PostHeader metadata={post.metadata} />
      
      <div className="flex flex-col lg:flex-row gap-8 relative">
        <article className="lg:w-3/4 w-full">
          <MarkdownContent content={post.content} />
        </article>
        
        <aside className="lg:w-1/4 hidden lg:block">
          <div className="sticky top-8">
            <TableOfContents content={post.content} />
          </div>
        </aside>
      </div>
    </div>
  );
}
