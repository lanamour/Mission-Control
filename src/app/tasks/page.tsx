'use client';

import { useState, useEffect, useCallback } from 'react';
import { tasks as mockTasks, projects } from '@/lib/mockData';
import { TaskBoard } from '@/components/TaskBoard';
import { Task, Project } from '@/lib/types';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [loading, setLoading] = useState(true);
  const [assigneeFilter, setAssigneeFilter] = useState<'all' | 'emmanuel' | 'lanamour'>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('fail');
      const data = await res.json();
      setTasks(data);
    } catch {
      setTasks(mockTasks);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const filteredTasks = tasks.filter(task => {
    const assigneeMatch = assigneeFilter === 'all' || task.assignee === assigneeFilter;
    const projectMatch = projectFilter === 'all' || task.projectId === projectFilter;
    return assigneeMatch && projectMatch;
  });

  const getStatsForPeriod = (period: 'week' | 'total' | 'inprogress' | 'completion') => {
    switch (period) {
      case 'week': return 8;
      case 'inprogress': return tasks.filter(t => t.status === 'in_progress').length;
      case 'total': return tasks.length;
      case 'completion':
        const completed = tasks.filter(t => t.status === 'done').length;
        return Math.round((completed / tasks.length) * 100);
      default: return 0;
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    try {
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, status: newStatus }),
      });
      await fetchTasks();
    } catch {}
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await fetch('/api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId }),
      });
      await fetchTasks();
    } catch {}
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, ...updates }),
      });
      await fetchTasks();
    } catch {}
  };

  const handleCreateTask = async (data: { title: string; description: string; status: Task['status']; assignee: 'emmanuel' | 'lanamour'; projectId: string; dueDate?: string }) => {
    const project = projects.find(p => p.id === data.projectId);
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, project: project?.name || '' }),
      });
      await fetchTasks();
      setShowNewTaskForm(false);
    } catch {}
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Tasks</h1>
          <p className="text-zinc-400">Manage and track all agent tasks</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 animate-pulse">
              <div className="h-8 bg-zinc-800 rounded w-16 mb-2" />
              <div className="h-4 bg-zinc-800 rounded w-24" />
            </div>
          ))}
        </div>
        <div className="flex md:grid md:grid-cols-5 gap-4 md:gap-6 flex-1 overflow-x-auto">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="bg-zinc-900/50 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-zinc-800 rounded w-20 mb-4" />
              <div className="space-y-3">
                {[1,2].map(j => <div key={j} className="h-24 bg-zinc-800 rounded" />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tasks</h1>
        <p className="text-zinc-400">Manage and track all agent tasks</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{getStatsForPeriod('week')}</p>
              <p className="text-sm text-zinc-400">This Week</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📅</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{getStatsForPeriod('inprogress')}</p>
              <p className="text-sm text-zinc-400">In Progress</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">⚡</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{getStatsForPeriod('total')}</p>
              <p className="text-sm text-zinc-400">Total Tasks</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📋</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{getStatsForPeriod('completion')}%</p>
              <p className="text-sm text-zinc-400">Completion</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowNewTaskForm(true)}
            className="btn-primary text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            New Task
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400 mr-2">Assignee:</span>
            {(['all', 'emmanuel', 'lanamour'] as const).map(assignee => (
              <button
                key={assignee}
                onClick={() => setAssigneeFilter(assignee)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  assigneeFilter === assignee
                    ? 'bg-purple-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
              >
                {assignee}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400 mr-2">Project:</span>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Projects</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-sm text-zinc-400">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <TaskBoard
          tasks={filteredTasks}
          projects={projects}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </div>

      {/* New Task Modal */}
      {showNewTaskForm && (
        <NewTaskModal
          onSubmit={handleCreateTask}
          onClose={() => setShowNewTaskForm(false)}
        />
      )}
    </div>
  );
}

function NewTaskModal({ onSubmit, onClose }: {
  onSubmit: (data: { title: string; description: string; status: Task['status']; assignee: 'emmanuel' | 'lanamour'; projectId: string; dueDate?: string }) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('backlog');
  const [assignee, setAssignee] = useState<'emmanuel' | 'lanamour'>('lanamour');
  const [projectId, setProjectId] = useState('1');
  const [dueDate, setDueDate] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-white">New Task</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit({ title, description, status, assignee, projectId, dueDate: dueDate || undefined }); }} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as Task['status'])} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="backlog">Backlog</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="recurring">Recurring</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Assignee</label>
              <select value={assignee} onChange={e => setAssignee(e.target.value as 'emmanuel' | 'lanamour')} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="lanamour">Lanamour</option>
                <option value="emmanuel">Emmanuel</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Project</label>
              <select value={projectId} onChange={e => setProjectId(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Due Date</label>
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
            <button type="submit" className="btn-primary text-white px-6 py-2 rounded-lg">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
