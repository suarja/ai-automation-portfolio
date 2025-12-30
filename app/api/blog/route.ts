import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/blog';

export async function GET() {
  try {
    const posts = await getBlogPosts();

    return NextResponse.json({
      success: true,
      data: posts,
      meta: {
        timestamp: new Date().toISOString(),
        total: posts.length,
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog posts',
      },
      { status: 500 }
    );
  }
}
