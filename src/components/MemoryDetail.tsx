'use client';

import { MemoryDocument } from '@/lib/types';
import { getTypeColor } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MemoryDetailProps {
  document: MemoryDocument;
  onClose: () => void;
}

export function MemoryDetail({ document, onClose }: MemoryDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-white">{document.title}</h2>
            <span className={`type-badge ${getTypeColor(document.type)} text-white`}>
              {document.type}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Metadata */}
        <div className="px-6 py-4 border-b border-zinc-800 flex-shrink-0">
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <span>📁 {document.filePath}</span>
            <span>📊 {document.wordCount} words</span>
            <span>🕐 Updated {document.lastUpdated}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="prose prose-invert prose-purple max-w-none">
              <div className="text-zinc-300 leading-relaxed">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mb-4 mt-6 first:mt-0" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold text-white mb-3 mt-5" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-white mb-2 mt-4" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-base font-semibold text-white mb-2 mt-3" {...props} />,
                    p: ({node, ...props}) => <p className="mb-3 text-zinc-300 leading-relaxed" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="text-zinc-300" {...props} />,
                    code: ({node, className, children, ...props}) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;
                      return isInline
                        ? <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-200" {...props}>{children}</code>
                        : <code className="block bg-zinc-800 p-4 rounded-lg text-sm font-mono text-zinc-200 overflow-x-auto" {...props}>{children}</code>;
                    },
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-purple-500 pl-4 my-4 italic text-zinc-400" {...props} />,
                    a: ({node, ...props}) => <a className="text-purple-400 hover:text-purple-300 underline" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                    em: ({node, ...props}) => <em className="italic text-zinc-300" {...props} />,
                  }}
                >
                  {document.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-zinc-800 flex-shrink-0">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}