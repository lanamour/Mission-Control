'use client';

import { useState, useEffect } from 'react';

interface GtcpData {
  totalRecords: number;
  makes: number;
  categories: Record<string, number>;
  avgPrice: number;
  maxPrice: number;
  recent: {
    date: string;
    make: string;
    model: string;
    year: string;
    price: number;
    priceEur: number;
    auction: string;
    category: string;
  }[];
  topMakes: { make: string; count: number }[];
  lpProspects: number;
  lastUpdated: string;
}

function formatCurrency(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
  return `$${n}`;
}

export default function GtcpPage() {
  const [data, setData] = useState<GtcpData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gtcp')
      .then(r => r.json())
      .then(d => { if (!d.error) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">GTCP</h1>
        <p className="text-zinc-400 text-sm md:text-base">Grand Touring Capital Partners — Fund Intelligence</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : data?.totalRecords || 0}</p>
              <p className="text-sm text-zinc-400">Transactions</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🏎️</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : formatCurrency(data?.avgPrice || 0)}</p>
              <p className="text-sm text-zinc-400">Avg Price</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">💰</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : data?.makes || 0}</p>
              <p className="text-sm text-zinc-400">Makes Tracked</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🔖</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : `${data?.lpProspects || '50'}+`}</p>
              <p className="text-sm text-zinc-400">LP Prospects</p>
            </div>
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🏦</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Transactions</h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-zinc-800 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-500 text-xs uppercase border-b border-zinc-800">
                    <th className="text-left py-2 pr-4">Date</th>
                    <th className="text-left py-2 pr-4">Car</th>
                    <th className="text-right py-2 pr-4">Price</th>
                    <th className="text-left py-2 hidden md:table-cell">Auction</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.recent.map((tx, i) => (
                    <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                      <td className="py-2.5 pr-4 text-zinc-400 whitespace-nowrap">{tx.date}</td>
                      <td className="py-2.5 pr-4 text-white whitespace-nowrap">
                        {tx.year} {tx.make} {tx.model}
                      </td>
                      <td className="py-2.5 pr-4 text-right text-green-400 font-medium whitespace-nowrap">
                        {formatCurrency(tx.price)}
                      </td>
                      <td className="py-2.5 text-zinc-500 hidden md:table-cell whitespace-nowrap">{tx.auction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top Makes + Categories */}
        <div className="space-y-4 md:space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Top Makes</h2>
            <div className="space-y-3">
              {(data?.topMakes || []).map(m => {
                const maxCount = data?.topMakes[0]?.count || 1;
                return (
                  <div key={m.make}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white">{m.make}</span>
                      <span className="text-xs text-zinc-500">{m.count as number}</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${((m.count as number) / maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Categories</h2>
            <div className="space-y-2">
              {Object.entries(data?.categories || {}).map(([cat, count]) => (
                <div key={cat} className="flex justify-between items-center">
                  <span className="text-sm text-zinc-400">{cat.replace(/_/g, ' ')}</span>
                  <span className="text-sm text-white font-medium">{count as number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
