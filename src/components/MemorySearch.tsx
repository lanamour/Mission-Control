'use client';

import { useState } from 'react';
import { MemoryType } from '@/lib/types';

interface MemorySearchProps {
  onSearch: (query: string) => void;
  onTypeFilter: (type: MemoryType | 'all') => void;
  selectedType: MemoryType | 'all';
}

const typeFilters: { type: MemoryType | 'all'; label: string; color: string }[] = [
  { type: 'all', label: 'All', color: 'bg-zinc-600' },
  { type: 'daily', label: 'Daily', color: 'bg-blue-600' },
  { type: 'longterm', label: 'Long-term', color: 'bg-purple-600' },
  { type: 'identity', label: 'Identity', color: 'bg-pink-600' },
  { type: 'tools', label: 'Tools', color: 'bg-yellow-600' },
  { type: 'soul', label: 'Soul', color: 'bg-green-600' },
];

export function MemorySearch({ onSearch, onTypeFilter, selectedType }: MemorySearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search memories..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-12 pr-4 py-4 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-2">
        {typeFilters.map((filter) => (
          <button
            key={filter.type}
            onClick={() => onTypeFilter(filter.type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === filter.type
                ? `${filter.color} text-white`
                : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}