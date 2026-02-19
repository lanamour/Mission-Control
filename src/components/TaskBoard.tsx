'use client';

import { useState } from 'react';
import { Task, Project, TaskStatus } from '@/lib/types';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';

interface TaskBoardProps {
  tasks: Task[];
  projects: Project[];
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask?: (taskId: string) => void;
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void;
}

const columns: { status: TaskStatus; title: string; color: string; dotColor: string }[] = [
  { status: 'recurring', title: 'Recurring', color: 'border-purple-500', dotColor: 'bg-purple-500' },
  { status: 'backlog', title: 'Backlog', color: 'border-zinc-500', dotColor: 'bg-zinc-500' },
  { status: 'in_progress', title: 'In Progress', color: 'border-blue-500', dotColor: 'bg-blue-500' },
  { status: 'review', title: 'Review', color: 'border-yellow-500', dotColor: 'bg-yellow-500' },
  { status: 'done', title: 'Done', color: 'border-green-500', dotColor: 'bg-green-500' },
];

export function TaskBoard({ tasks, projects, onStatusChange, onDeleteTask, onUpdateTask }: TaskBoardProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const getProjectById = (projectId: string) => 
    projects.find(p => p.id === projectId) || projects[0];

  const getTasksByStatus = (status: TaskStatus) => 
    tasks.filter(task => task.status === status);

  return (
    <>
      <div className="flex md:grid md:grid-cols-5 gap-4 md:gap-6 h-full overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory md:snap-none">
        {columns.map(column => {
          const columnTasks = getTasksByStatus(column.status);
          
          return (
            <div key={column.status} className="flex flex-col min-w-[280px] md:min-w-0 snap-start">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${column.dotColor}`} />
                <h3 className="font-medium text-white">{column.title}</h3>
                <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              
              <div className={`kanban-column flex-1 p-4 ${column.color} border-l-4`}>
                <div className="space-y-3">
                  {columnTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      project={getProjectById(task.projectId)}
                      onClick={() => setSelectedTask(task)}
                      onStatusChange={onStatusChange}
                      onDelete={onDeleteTask}
                    />
                  ))}
                </div>
                
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-zinc-500">
                    <p className="text-sm">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          project={getProjectById(selectedTask.projectId)}
          onClose={() => setSelectedTask(null)}
          onStatusChange={onStatusChange}
          onDelete={onDeleteTask}
          onUpdate={(updates) => {
            if (onUpdateTask) onUpdateTask(selectedTask.id, updates);
            setSelectedTask(null);
          }}
        />
      )}
    </>
  );
}
