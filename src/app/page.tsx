'use client';

import { useState, useEffect } from 'react';
import { tasks, projects, teamMembers, memoryDocuments, calendarEvents } from '@/lib/mockData';

const activityEvents = [
  {
    id: '1',
    type: 'subagent' as const,
    icon: '🤖',
    title: 'Mission Control UX Polish',
    status: 'success' as const,
    timestamp: '2026-02-19T12:44:00Z',
  },
  {
    id: '4',
    type: 'cron' as const,
    icon: '⏰',
    title: 'GTCP Weekly Deal Sourcing',
    status: 'success' as const,
    timestamp: '2026-02-19T07:00:00Z',
  },
  {
    id: '3',
    type: 'heartbeat' as const,
    icon: '💓',
    title: 'Heartbeat Check',
    status: 'success' as const,
    timestamp: '2026-02-19T03:00:00Z',
  },
  {
    id: '5',
    type: 'memory' as const,
    icon: '🧠',
    title: 'MEMORY.md Updated',
    status: 'info' as const,
    timestamp: '2026-02-18T23:30:00Z',
  },
  {
    id: '6',
    type: 'subagent' as const,
    icon: '🤖',
    title: 'Build Mission Control',
    status: 'success' as const,
    timestamp: '2026-02-18T23:00:00Z',
  },
];

function timeAgo(timestamp: string): string {
  const now = new Date('2026-02-19T13:43:00Z');
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${diffDays}d ago`;
}

const statusStyles: Record<string, { dot: string; text: string }> = {
  success: { dot: 'bg-green-400', text: 'text-green-400' },
  info: { dot: 'bg-zinc-400', text: 'text-zinc-400' },
  running: { dot: 'bg-blue-400', text: 'text-blue-400' },
  failed: { dot: 'bg-red-400', text: 'text-red-400' },
};

export default function DashboardPage() {
  const [liveTasks, setLiveTasks] = useState(tasks);
  const inProgress = liveTasks.filter(t => t.status === 'in_progress').length;
  const done = liveTasks.filter(t => t.status === 'done').length;
  const activeAgents = teamMembers.filter(t => t.status === 'active').length;

  const [stats, setStats] = useState({ memoryFiles: memoryDocuments.length, totalWords: memoryDocuments.reduce((s, d) => s + (d.wordCount || 0), 0) });

  useEffect(() => {
    fetch('/api/tasks')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setLiveTasks(data); })
      .catch(() => {});
    fetch('/api/stats')
      .then(r => r.json())
      .then(data => { if (data.memoryFiles != null) setStats({ memoryFiles: data.memoryFiles, totalWords: data.totalWords }); })
      .catch(() => {});
  }, []);

  const memoryFiles = stats.memoryFiles;
  const totalWords = stats.totalWords;

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Dashboard</h1>
        <p className="text-zinc-400 text-sm md:text-base">Welcome back, Emmanuel</p>
      </div>

      {/* Row 1: Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {[
          { label: 'Tasks In Progress', value: inProgress, icon: '⚡', bg: 'bg-blue-600' },
          { label: 'Tasks Done', value: done, icon: '✓', bg: 'bg-green-600' },
          { label: 'Active Agents', value: activeAgents, icon: '🤖', bg: 'bg-purple-600' },
          { label: 'Memory Files', value: memoryFiles, icon: '🧠', bg: 'bg-orange-600' },
        ].map((card) => (
          <div key={card.label} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{card.value}</p>
                <p className="text-sm text-zinc-400">{card.label}</p>
              </div>
              <div className={`w-12 h-12 ${card.bg} rounded-lg flex items-center justify-center`}>
                <span className="text-white text-xl">{card.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Recent Activity + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <a href="/activity" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View all →</a>
          </div>
          <div className="space-y-3">
            {activityEvents.map((event) => {
              const sc = statusStyles[event.status];
              return (
                <div key={event.id} className="flex items-center gap-3 py-2">
                  <span className="text-lg flex-shrink-0" suppressHydrationWarning>{event.icon}</span>
                  <span className="text-sm text-white flex-1 truncate">{event.title}</span>
                  <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full ${sc.text} bg-zinc-800`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {event.status}
                  </span>
                  <span className="text-xs text-zinc-500 flex-shrink-0">{timeAgo(event.timestamp)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Upcoming</h2>
            <a href="/calendar" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View all →</a>
          </div>
          <div className="space-y-4">
            {calendarEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <div className="text-xs text-zinc-500 w-16 flex-shrink-0 pt-0.5 uppercase font-medium">
                  {event.date ? new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : event.day}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{event.title}</p>
                  <span className={`inline-block text-xs px-1.5 py-0.5 rounded mt-1 ${
                    event.type === 'cron' ? 'bg-blue-600/20 text-blue-400' : 'bg-red-600/20 text-red-400'
                  }`}>
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Projects + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Projects Overview */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Projects Overview</h2>
          <div className="space-y-4">
            {projects.map((project) => {
              const projectTasks = liveTasks.filter(t => t.projectId === project.id);
              const total = projectTasks.length;
              const ip = projectTasks.filter(t => t.status === 'in_progress').length;
              const d = projectTasks.filter(t => t.status === 'done').length;
              const pct = total > 0 ? Math.round((d / total) * 100) : 0;
              if (total === 0) return null;
              return (
                <div key={project.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white font-medium">{project.name}</span>
                    <span className="text-xs text-zinc-500">{ip} in progress / {total} total</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: project.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Stats</h2>
          <div className="space-y-4">
            {[
              { label: 'Agent Uptime', value: '4 days', icon: '🟢' },
              { label: 'Words in Memory', value: totalWords.toLocaleString(), icon: '📝' },
              { label: 'Cron Jobs Active', value: '3', icon: '⏰' },
              { label: 'LP Prospects', value: '50+', icon: '🎯' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm" suppressHydrationWarning>{stat.icon}</span>
                  <span className="text-sm text-zinc-400">{stat.label}</span>
                </div>
                <span className="text-sm text-white font-medium">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
