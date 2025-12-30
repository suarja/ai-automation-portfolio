import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-4 mb-2 text-white">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="text-gray-300">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-400 my-4">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-[#222] px-2 py-1 rounded text-sm text-primary">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-[#222] p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
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
    hr: () => <hr className="border-[#333] my-8" />,
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
    ...components,
  }
}
