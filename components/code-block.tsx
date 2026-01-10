'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Extract text content from children
    const extractText = (node: React.ReactNode): string => {
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return String(node);
      if (Array.isArray(node)) return node.map(extractText).join('');
      if (node && typeof node === 'object' && 'props' in node) {
        return extractText(node.props.children);
      }
      return '';
    };

    const text = extractText(children);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group">
      <pre className={`bg-[#1a1a1a] p-4 rounded-lg overflow-x-auto mb-4 border border-[#333] ${className || ''}`}>
        {children}
      </pre>
      <Button
        onClick={handleCopy}
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#444]"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 mr-1" />
            <span className="text-xs">Copié</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3 mr-1" />
            <span className="text-xs">Copier</span>
          </>
        )}
      </Button>
    </div>
  );
}
