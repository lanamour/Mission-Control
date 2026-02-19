'use client';

import { useState, useEffect } from 'react';

interface Position {
  name: string;
  ticker: string;
  invested: number;
  currentValue?: number;
  markup?: string;
  status: string;
  notes: string;
  type: string;
}

interface PortfolioData {
  positions: Position[];
  totalInvested: number;
  ethPrice: number;
  estimatedValue: number;
  lastUpdated: string;
}

function formatUsd(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

const typeColors: Record<string, { bg: string; text: string }> = {
  crypto: { bg: 'bg-blue-600/20', text: 'text-blue-400' },
  defi: { bg: 'bg-purple-600/20', text: 'text-purple-400' },
  nft: { bg: 'bg-pink-600/20', text: 'text-pink-400' },
};

export default function PortfolioPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Portfolio</h1>
        <p className="text-zinc-400 text-sm md:text-base">
          Crypto & venture investments
          {data?.ethPrice ? ` · ETH ${formatUsd(data.ethPrice)}` : ''}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : formatUsd(data?.totalInvested || 0)}</p>
              <p className="text-sm text-zinc-400">Total Invested</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">💰</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-400">{loading ? '…' : formatUsd(data?.estimatedValue || 0)}</p>
              <p className="text-sm text-zinc-400">Est. Value</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📈</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : data?.positions.length || 0}</p>
              <p className="text-sm text-zinc-400">Positions</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🎯</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : data?.ethPrice ? formatUsd(data.ethPrice) : '—'}</p>
              <p className="text-sm text-zinc-400">ETH Price</p>
            </div>
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">⟠</span>
            </div>
          </div>
        </div>
      </div>

      {/* Positions */}
      <div className="space-y-4">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 animate-pulse">
              <div className="h-5 bg-zinc-800 rounded w-1/3 mb-3" />
              <div className="h-4 bg-zinc-800 rounded w-2/3" />
            </div>
          ))
        ) : (
          data?.positions.map((pos, i) => {
            const tc = typeColors[pos.type] || typeColors.crypto;
            return (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-semibold">{pos.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>{pos.type}</span>
                      {pos.markup && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-600/20 text-green-400 font-medium">
                          {pos.markup}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 mb-1">{pos.status}</p>
                    <p className="text-xs text-zinc-500">{pos.notes}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-white font-medium">{formatUsd(pos.invested)}</p>
                    <p className="text-xs text-zinc-500">invested</p>
                    {pos.currentValue && (
                      <>
                        <p className="text-green-400 font-medium mt-1">{formatUsd(pos.currentValue)}</p>
                        <p className="text-xs text-zinc-500">current</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
