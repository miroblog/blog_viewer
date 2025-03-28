import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { getAllPosts } from '@/lib/posts';

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

// This function is called at build time
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">블로그</h1>
        <p className="text-xl text-gray-900 dark:text-gray-400 max-w-3xl mx-auto">
          하이퍼리즘 엔지니어링 팀의 기술 아티클, 튜토리얼 및 인사이트를 탐색하세요.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          {posts.map((post) => {
            const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');
            
            return (
              <Link 
                href={`/${post.slug}`} 
                key={post.slug}
                className="block mb-12 group"
              >
                <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:shadow-xl">
                  <div className="relative md:w-1/3 h-48 md:h-auto">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {post.title}
                    </h2>
                    <div className="flex items-center mb-4">
                      <div className="relative w-8 h-8 mr-2">
                        <Image
                          src={post.authorImage}
                          alt={post.author}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-900 dark:text-gray-400 mr-4">{post.author}</span>
                      <span className="text-sm text-gray-900 dark:text-gray-400">{formattedDate}</span>
                    </div>
                    <p className="text-gray-900 dark:text-gray-400 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">No posts found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Check back soon for new content!
          </p>
        </div>
      )}
    </div>
  );
}