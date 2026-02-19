'use client';

import { useState } from 'react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ label: string; href: string; type: string }[]>([]);
  const [open, setOpen] = useState(false);

  const allItems = [
    // Tasks
    { label: 'Dashboard', href: '/', type: 'page' },
    { label: 'Tasks Board', href: '/tasks', type: 'page' },
    { label: 'Calendar', href: '/calendar', type: 'page' },
    { label: 'Memory Files', href: '/memory', type: 'page' },
    { label: 'Team Members', href: '/team', type: 'page' },
    { label: 'Office Floor', href: '/office', type: 'page' },
    // Some searchable items
    { label: 'SOUL.md', href: '/memory', type: 'memory' },
    { label: 'MEMORY.md', href: '/memory', type: 'memory' },
    { label: 'Daily Notes', href: '/memory', type: 'memory' },
    { label: 'Emmanuel', href: '/team', type: 'team' },
    { label: 'Weekly Reports', href: '/memory', type: 'memory' },
    { label: 'Task Management', href: '/tasks', type: 'task' },
    { label: 'Agent Network', href: '/team', type: 'team' },
  ];

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim().length === 0) {
      setResults([]);
      setOpen(false);
      return;
    }
    const lower = q.toLowerCase();
    setResults(allItems.filter(i => i.label.toLowerCase().includes(lower)));
    setOpen(true);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mc-text-muted)]">🔍</span>
        <input
          type="text"
          placeholder="Search tasks, memory, team..."
          value={query}
          onChange={e => handleSearch(e.target.value)}
          onFocus={() => query && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          className="w-full pl-10 pr-4 py-3 rounded-lg text-base
            bg-[var(--mc-surface)] border border-[var(--mc-border)]
            text-[var(--mc-text)] placeholder-[var(--mc-text-muted)]
            focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-[var(--mc-border)] bg-[var(--mc-surface)] shadow-lg z-50 max-h-64 overflow-auto">
          {results.map((r, i) => (
            <a
              key={i}
              href={r.href}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--mc-text)] hover:bg-[var(--mc-hover)] transition-colors"
            >
              <span className="text-xs px-1.5 py-0.5 rounded bg-purple-600/20 text-purple-400 font-medium uppercase">{r.type}</span>
              {r.label}
            </a>
          ))}
        </div>
      )}
      {open && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-[var(--mc-border)] bg-[var(--mc-surface)] shadow-lg z-50 p-4 text-sm text-[var(--mc-text-muted)]">
          No results for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
