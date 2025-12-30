import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Customize MDX components here
    // Example: h1: ({ children }) => <h1 className="text-4xl font-bold">{children}</h1>,
    ...components,
  }
}
