import { MemoryDocument } from '@/lib/types';
import { getTypeColor, truncateText } from '@/lib/utils';

interface MemoryCardProps {
  document: MemoryDocument;
  onClick: () => void;
}

export function MemoryCard({ document, onClick }: MemoryCardProps) {
  return (
    <div className="memory-card" onClick={onClick}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-white text-lg leading-tight pr-2">
          {document.title}
        </h3>
        <span className={`type-badge ${getTypeColor(document.type)} text-white flex-shrink-0`}>
          {document.type}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-3 text-sm text-zinc-400">
        <span>{document.lastUpdated}</span>
        <span>•</span>
        <span>{document.wordCount} words</span>
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-4">
        {truncateText(document.content, 150)}
      </p>

      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span>{document.filePath}</span>
        <span>Click to view</span>
      </div>
    </div>
  );
}