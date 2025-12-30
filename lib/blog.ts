import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPostMetadata {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  featured: boolean;
  coverImage?: string;
}

export interface BlogPost extends BlogPostMetadata {
  slug: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Ensure directory exists
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '');

      // Import the MDX file dynamically
      try {
        const mdxModule = await import(`@/content/blog/${file}`);
        const metadata = mdxModule.metadata as BlogPostMetadata;

        return {
          slug,
          ...metadata,
        };
      } catch (error) {
        console.error(`Error loading ${file}:`, error);
        // Return a default object if metadata is missing
        return {
          slug,
          title: slug,
          description: '',
          publishedAt: new Date().toISOString(),
          author: '',
          tags: [],
          featured: false,
        };
      }
    })
  );

  // Sort by publishedAt date (newest first)
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.featured);
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}
