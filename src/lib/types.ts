export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'recurring' | 'backlog' | 'in_progress' | 'review' | 'done';
  assignee: 'emmanuel' | 'lanamour';
  project: string;
  projectId: string;
  dueDate?: string;
  createdAt: string;
  cronJobId?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  type: 'lead' | 'subagent';
  emoji: string;
  avatar: string;
  avatarColor: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  model: string;
  status: 'active' | 'idle' | 'offline';
  currentTask: string | null;
  tasksCompleted: number;
  tasksAssigned: number;
}

export interface AgentRun {
  agentName: string;
  emoji: string;
  task: string;
  status: 'running' | 'completed' | 'failed';
  startedAt: number;
  duration?: string;
}

export interface MemoryDocument {
  id: string;
  title: string;
  type: 'daily' | 'longterm' | 'identity' | 'tools' | 'soul';
  filePath: string;
  content: string;
  wordCount: number;
  lastUpdated: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date?: string;
  day?: string;
  time?: string;
  recurring: boolean;
  assignee: string;
  color: string;
  type: 'cron' | 'deadline' | 'milestone';
}

export type TaskStatus = Task['status'];
export type AgentStatus = TeamMember['status'];
export type MemoryType = MemoryDocument['type'];