'use client';

import { useState, useEffect } from 'react';

interface ActivityEvent {
  id: string;
  type: string;
  icon: string;
  title: string;
  status: string;
  timestamp: string;
  detail?: string;
}

const typeConfig: Record<string, { icon: string; label: string; color: string }> = {
  cron: { icon: '⏰', label: 'Cron', color: 'bg-blue-600' },
  memory: { icon: '🧠', label: 'Memory', color: 'bg-green-600' },
  workspace: { icon: '📝', label: 'Workspace', color: 'bg-yellow-600' },
  session: { icon: '💬', label: 'Session', color: 'bg-purple-600' },
  tasks: { icon: '✅', label: 'Tasks', color: 'bg-pink-600' },
  email: { icon: '📧', label: 'Email', color: 'bg-cyan-600' },
};

const statusStyles: Record<string, { dot: string; text: string }> = {
  success: { dot: 'bg-green-400', text: 'text-green-400' },
  active: { dot: 'bg-blue-400', text: 'text-blue-400' },
  info: { dot: 'bg-zinc-400', text: 'text-zinc-400' },
  disabled: { dot: 'bg-zinc-600', text: 'text-zinc-600' },
  delivered: { dot: 'bg-green-400', text: 'text-green-400' },
  bounced: { dot: 'bg-red-400', text: 'text-red-400' },
};

function timeAgo(ts: string): string {
  const now = Date.now();
  const then = new Date(ts).getTime();
  const diff = now - then;
  const min = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

function formatTime(ts: string): string {
  return new Date(ts).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
  });
}

export default function ActivityPage() {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/api/activity')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setEvents(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? events : events.filter(e => e.type === filter);

  const typeCounts = events.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filterTypes = ['all', ...Object.keys(typeConfig)];

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Activity</h1>
        <p className="text-zinc-400 text-sm md:text-base">Real-time log of agent operations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : events.length}</p>
              <p className="text-sm text-zinc-400">Total Events</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-xl" suppressHydrationWarning>⚡</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : typeCounts['email'] || 0}</p>
              <p className="text-sm text-zinc-400">Emails</p>
            </div>
            <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center">
              <span className="text-xl" suppressHydrationWarning>📧</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : typeCounts['session'] || 0}</p>
              <p className="text-sm text-zinc-400">Sessions</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-xl" suppressHydrationWarning>💬</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : typeCounts['cron'] || 0}</p>
              <p className="text-sm text-zinc-400">Cron Jobs</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-xl" suppressHydrationWarning>⏰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filterTypes.map((type) => {
          const tc = typeConfig[type];
          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                filter === type
                  ? 'bg-purple-600 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
              }`}
            >
              {type === 'all' ? `All (${events.length})` : `${tc?.icon || '•'} ${tc?.label || type} (${typeCounts[type] || 0})`}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-1/3 mb-2" />
                <div className="h-3 bg-zinc-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((event) => {
              const tc = typeConfig[event.type] || { icon: '•', label: event.type, color: 'bg-zinc-600' };
              const sc = statusStyles[event.status] || statusStyles.info;
              return (
                <div key={event.id} className="flex items-start gap-4 px-4 md:px-5 py-4 md:py-5 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${tc.color} flex items-center justify-center`}>
                    <span className="text-lg" suppressHydrationWarning>{event.icon || tc.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-white font-medium text-sm">{event.title}</h3>
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full ${sc.text} bg-zinc-800`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {event.status}
                      </span>
                    </div>
                    {event.detail && <p className="text-xs text-zinc-500">{event.detail}</p>}
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-zinc-500">{timeAgo(event.timestamp)}</p>
                    <p className="text-xs text-zinc-600 mt-0.5">{formatTime(event.timestamp)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
}
