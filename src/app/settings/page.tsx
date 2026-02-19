'use client';

import { useState, useEffect } from 'react';

interface ConfigData {
  model?: string;
  heartbeatModel?: string;
  compactionMode?: string;
  memoryFlush?: boolean;
  memoryFlushThreshold?: number;
  contextPruning?: string;
  contextPruningTtl?: string;
  memorySearch?: boolean;
  hybridSearch?: boolean;
  sessionMemory?: boolean;
  maxConcurrent?: number;
  subagentsConcurrent?: number;
}

export default function SettingsPage() {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState(true);
  const [raw, setRaw] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setConfig(data.parsed);
        setRaw(data.raw);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Settings</h1>
          <p className="text-zinc-400 text-sm md:text-base">OpenClaw configuration</p>
        </div>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-zinc-800 rounded w-1/4 mb-3" />
              <div className="h-3 bg-zinc-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const sections = [
    {
      title: 'Model',
      icon: '🤖',
      color: 'bg-purple-600',
      items: [
        { label: 'Primary Model', value: config?.model || 'Default (Opus 4)' },
        { label: 'Heartbeat Model', value: config?.heartbeatModel || 'Not set' },
        { label: 'Max Concurrent', value: String(config?.maxConcurrent || 4) },
        { label: 'Subagent Concurrent', value: String(config?.subagentsConcurrent || 8) },
      ],
    },
    {
      title: 'Memory',
      icon: '🧠',
      color: 'bg-green-600',
      items: [
        { label: 'Memory Search', value: config?.memorySearch ? '✅ Enabled' : '❌ Disabled' },
        { label: 'Hybrid Search', value: config?.hybridSearch ? '✅ Vector 0.7 + BM25 0.3' : '❌ Disabled' },
        { label: 'Session Memory', value: config?.sessionMemory ? '✅ Experimental' : '❌ Disabled' },
      ],
    },
    {
      title: 'Compaction',
      icon: '📦',
      color: 'bg-blue-600',
      items: [
        { label: 'Mode', value: config?.compactionMode || 'default' },
        { label: 'Memory Flush', value: config?.memoryFlush ? '✅ Enabled' : '❌ Disabled' },
        { label: 'Flush Threshold', value: config?.memoryFlushThreshold ? `${(config.memoryFlushThreshold / 1000).toFixed(0)}k tokens` : 'Not set' },
      ],
    },
    {
      title: 'Context Pruning',
      icon: '✂️',
      color: 'bg-yellow-600',
      items: [
        { label: 'Mode', value: config?.contextPruning || 'off' },
        { label: 'TTL', value: config?.contextPruningTtl || 'Not set' },
      ],
    },
  ];

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Settings</h1>
        <p className="text-zinc-400 text-sm md:text-base">OpenClaw agent configuration (read-only)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
        {sections.map(section => (
          <div key={section.title} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 ${section.color} rounded-lg flex items-center justify-center`}>
                <span className="text-lg">{section.icon}</span>
              </div>
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            </div>
            <div className="space-y-3">
              {section.items.map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">{item.label}</span>
                  <span className="text-sm text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Raw Config */}
      {raw && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Raw Configuration</h2>
          <pre className="text-xs text-zinc-400 font-mono overflow-x-auto max-h-96 overflow-y-auto bg-zinc-800 rounded-lg p-4">
            {JSON.stringify(raw, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
