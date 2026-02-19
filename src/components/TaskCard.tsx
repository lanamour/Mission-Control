'use client';

import { useState } from 'react';
import { Task, Project, TaskStatus } from '@/lib/types';
import { AvatarCircle } from './AvatarCircle';
import { ProjectBadge } from './ProjectBadge';
import { formatTimeAgo, truncateText, getAssigneeColor } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  project: Project;
  onClick?: () => void;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  onDelete?: (taskId: string) => void;
}

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'recurring', label: 'Recurring' },
  { value: 'backlog', label: 'Backlog' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
];

export function TaskCard({ task, project, onClick, onStatusChange, onDelete }: TaskCardProps) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  return (
    <div className="task-card relative group">
      {/* Delete button */}
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 transition-all"
          title="Delete task"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <div onClick={onClick}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white text-sm leading-tight pr-6">
            {task.title}
          </h3>
          <AvatarCircle 
            letter={task.assignee === 'emmanuel' ? 'E' : 'L'}
            color={getAssigneeColor(task.assignee)}
            size="sm"
          />
        </div>
        
        {task.description && (
          <p className="text-zinc-400 text-sm mb-3 leading-relaxed">
            {truncateText(task.description, 100)}
          </p>
        )}

        <div className="flex items-center justify-between">
          <ProjectBadge name={project.name} color={project.color} size="sm" />
          <span className="text-xs text-zinc-500">
            {formatTimeAgo(task.createdAt)}
          </span>
        </div>

        {task.dueDate && (
          <div className="mt-2 text-xs text-yellow-400">
            Due: {new Date(task.dueDate).toLocaleDateString('en-GB')}
          </div>
        )}
      </div>

      {/* Status change dropdown */}
      {onStatusChange && (
        <div className="mt-2 pt-2 border-t border-zinc-800">
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowStatusMenu(!showStatusMenu); }}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Move to →
            </button>
            {showStatusMenu && (
              <div className="absolute bottom-full left-0 mb-1 bg-zinc-800 border border-zinc-700 rounded-lg py-1 z-20 min-w-[140px]">
                {statusOptions.filter(s => s.value !== task.status).map(s => (
                  <button
                    key={s.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStatusChange(task.id, s.value);
                      setShowStatusMenu(false);
                    }}
                    className="block w-full text-left px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700 transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
