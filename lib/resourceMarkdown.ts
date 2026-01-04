import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content/resources');

export interface ResourceMdxMetadata {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  price: string;
  featured: boolean;
  coverImage?: string;
  gallery?: string[];
}

export interface ResourceMdx extends ResourceMdxMetadata {
  slug: string;
}

/**
 * Get all resource MDX files
 */
export async function getResourceMdxFiles(): Promise<ResourceMdx[]> {
  // Ensure directory exists
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

  const resources = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '');

      // Import the MDX file dynamically
      try {
        const mdxModule = await import(`@/content/resources/${file}`);
        const metadata = mdxModule.metadata as ResourceMdxMetadata;

        return {
          slug,
          ...metadata,
        };
      } catch (error) {
        console.error(`Error loading resource ${file}:`, error);
        // Return a default object if metadata is missing
        return {
          slug,
          title: slug,
          description: '',
          longDescription: '',
          image: '',
          tags: [],
          price: 'Gratuit',
          featured: false,
        };
      }
    })
  );

  return resources;
}

/**
 * Get featured resource MDX files
 */
export async function getFeaturedResourceMdx(): Promise<ResourceMdx[]> {
  const resources = await getResourceMdxFiles();
  return resources.filter((r) => r.featured);
}

/**
 * Get all resource slugs for static generation
 */
export function getAllResourceSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

/**
 * Check if a resource has MDX content
 */
export function hasResourceMdxContent(slug: string): boolean {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  return fs.existsSync(filePath);
}
