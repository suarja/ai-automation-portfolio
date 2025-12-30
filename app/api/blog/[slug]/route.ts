import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // Dynamically import the MDX file
    const mdxModule = await import(`@/content/blog/${slug}.mdx`);
    const metadata = mdxModule.metadata;

    if (!metadata) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog post not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        slug,
        ...metadata,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error(`Error fetching blog post ${(await params).slug}:`, error);
    return NextResponse.json(
      {
        success: false,
        error: 'Blog post not found',
      },
      { status: 404 }
    );
  }
}
