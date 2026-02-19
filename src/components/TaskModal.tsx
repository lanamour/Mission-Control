'use client';

import { useState } from 'react';
import { Task, Project, TaskStatus } from '@/lib/types';
import { AvatarCircle } from './AvatarCircle';
import { ProjectBadge } from './ProjectBadge';
import { StatusBadge } from './StatusBadge';
import { formatTimeAgo, getAssigneeColor } from '@/lib/utils';
import { projects } from '@/lib/mockData';

interface TaskModalProps {
  task: Task;
  project: Project;
  onClose: () => void;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  onDelete?: (taskId: string) => void;
  onUpdate?: (updates: Partial<Task>) => void;
}

export function TaskModal({ task, project, onClose, onStatusChange, onDelete, onUpdate }: TaskModalProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [assignee, setAssignee] = useState(task.assignee);
  const [projectId, setProjectId] = useState(task.projectId);
  const [dueDate, setDueDate] = useState(task.dueDate || '');

  const handleSave = () => {
    const proj = projects.find(p => p.id === projectId);
    if (onUpdate) {
      onUpdate({ title, description, status, assignee, projectId, project: proj?.name || task.project, dueDate: dueDate || undefined });
    }
  };

  const handleDelete = () => {
    if (onDelete) { onDelete(task.id); onClose(); }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-white">{editing ? 'Edit Task' : 'Task Details'}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Title</label>
              {editing ? (
                <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
              ) : (
                <h3 className="text-lg font-semibold text-white">{task.title}</h3>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
              {editing ? (
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
              ) : (
                <p className="text-zinc-300 leading-relaxed">{task.description || 'No description provided'}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Status</label>
                {editing ? (
                  <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="recurring">Recurring</option>
                    <option value="backlog">Backlog</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                ) : (
                  <StatusBadge status={task.status} />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Project</label>
                {editing ? (
                  <select value={projectId} onChange={e => setProjectId(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                ) : (
                  <ProjectBadge name={project.name} color={project.color} />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Assignee</label>
                {editing ? (
                  <select value={assignee} onChange={e => setAssignee(e.target.value as 'emmanuel' | 'lanamour')} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="lanamour">Lanamour</option>
                    <option value="emmanuel">Emmanuel</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-2">
                    <AvatarCircle letter={task.assignee === 'emmanuel' ? 'E' : 'L'} color={getAssigneeColor(task.assignee)} size="sm" />
                    <span className="text-white capitalize">{task.assignee}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">{editing ? 'Due Date' : 'Created'}</label>
                {editing ? (
                  <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                ) : (
                  <span className="text-zinc-300">{formatTimeAgo(task.createdAt)}</span>
                )}
              </div>
            </div>

            {!editing && task.dueDate && (
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Due Date</label>
                <span className="text-yellow-400">{new Date(task.dueDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            )}

            {!editing && task.cronJobId && (
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Cron Job ID</label>
                <code className="bg-zinc-800 px-2 py-1 rounded text-sm text-zinc-300">{task.cronJobId}</code>
              </div>
            )}

            {/* Quick status change buttons (view mode) */}
            {!editing && onStatusChange && (
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Move to</label>
                <div className="flex flex-wrap gap-2">
                  {(['recurring', 'backlog', 'in_progress', 'review', 'done'] as TaskStatus[])
                    .filter(s => s !== task.status)
                    .map(s => (
                      <button
                        key={s}
                        onClick={() => { onStatusChange(task.id, s); onClose(); }}
                        className="px-3 py-1.5 text-xs rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors capitalize"
                      >
                        {s.replace('_', ' ')}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-3 p-6 border-t border-zinc-800">
          <div>
            {onDelete && (
              <button onClick={handleDelete} className="px-4 py-2 text-red-400 hover:text-red-300 transition-colors text-sm">
                Delete Task
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 text-zinc-400 hover:text-white transition-colors">Close</button>
            {editing ? (
              <button onClick={handleSave} className="btn-primary text-white px-4 py-2 rounded-lg">Save</button>
            ) : (
              <button onClick={() => setEditing(true)} className="btn-primary text-white px-4 py-2 rounded-lg">Edit Task</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
