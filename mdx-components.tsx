import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from './components/code-block'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-soft leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-soft space-y-2 mb-4 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-soft space-y-2 mb-4 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="text-soft">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-secondary px-2 py-1 rounded text-sm text-primary">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <CodeBlock>{children}</CodeBlock>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    hr: () => <hr className="border-border my-8" />,
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-soft">{children}</em>,
    ...components,
  }
}
