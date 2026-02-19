'use client';

import { useState, useMemo, useEffect } from 'react';
import { memoryDocuments as mockDocuments } from '@/lib/mockData';
import { MemoryCard } from '@/components/MemoryCard';
import { MemorySearch } from '@/components/MemorySearch';
import { MemoryDetail } from '@/components/MemoryDetail';
import { MemoryDocument, MemoryType } from '@/lib/types';

export default function MemoryPage() {
  const [documents, setDocuments] = useState<MemoryDocument[]>(mockDocuments);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<MemoryType | 'all'>('all');
  const [selectedDocument, setSelectedDocument] = useState<MemoryDocument | null>(null);

  useEffect(() => {
    fetch('/api/memory')
      .then(res => res.json())
      .then((data: MemoryDocument[]) => {
        if (Array.isArray(data) && data.length > 0) setDocuments(data);
      })
      .catch(() => { /* keep mock data */ })
      .finally(() => setLoading(false));
  }, []);

  const filteredDocuments = useMemo(() => {
    let filtered = documents;

    if (selectedType !== 'all') {
      filtered = filtered.filter(doc => doc.type === selectedType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(query) ||
        doc.content.toLowerCase().includes(query)
      );
    }

    const typePriority = { longterm: 0, identity: 1, soul: 2, daily: 3, tools: 4 };
    return filtered.sort((a, b) => {
      const typeDiff = typePriority[a.type] - typePriority[b.type];
      if (typeDiff !== 0) return typeDiff;
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    });
  }, [documents, searchQuery, selectedType]);

  const getTotalWordCount = () => documents.reduce((total, doc) => total + doc.wordCount, 0);
  const getTypeStats = () => documents.reduce((acc, doc) => { acc[doc.type] = (acc[doc.type] || 0) + 1; return acc; }, {} as Record<string, number>);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Memory</h1>
        <p className="text-zinc-400">Knowledge base and memory documents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : documents.length}</p>
              <p className="text-sm text-zinc-400">Documents</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📄</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : getTotalWordCount().toLocaleString()}</p>
              <p className="text-sm text-zinc-400">Total Words</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : (getTypeStats()['daily'] || 0)}</p>
              <p className="text-sm text-zinc-400">Daily Logs</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📅</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{filteredDocuments.length}</p>
              <p className="text-sm text-zinc-400">Filtered</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <MemorySearch
          onSearch={setSearchQuery}
          onTypeFilter={setSelectedType}
          selectedType={selectedType}
        />
      </div>

      {/* Memory Grid */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-3/4 mb-3" />
                <div className="h-3 bg-zinc-800 rounded w-1/2 mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-zinc-800 rounded w-full" />
                  <div className="h-3 bg-zinc-800 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
            {filteredDocuments.map((document) => (
              <MemoryCard
                key={document.id}
                document={document}
                onClick={() => setSelectedDocument(document)}
              />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-12">
              <p className="text-zinc-500 text-lg mb-2">No memories found</p>
              <p className="text-zinc-600 text-sm">
                {searchQuery
                  ? `No documents match "${searchQuery}"`
                  : 'No documents in this category'
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Memory Detail Modal */}
      {selectedDocument && (
        <MemoryDetail
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
}
