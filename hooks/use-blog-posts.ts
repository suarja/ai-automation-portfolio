import { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/blog';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    timestamp: string;
    total?: number;
  };
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog');
        const data: ApiResponse<BlogPost[]> = await response.json();

        if (data.success) {
          setPosts(data.data);
        } else {
          setError('Failed to load blog posts');
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        const data: ApiResponse<BlogPost> = await response.json();

        if (data.success) {
          setPost(data.data);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error(`Error fetching blog post ${slug}:`, err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return { post, loading, error };
}
