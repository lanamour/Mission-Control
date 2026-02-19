import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(date: string | number): string {
  const now = new Date().getTime();
  const targetTime = typeof date === 'string' ? new Date(date).getTime() : date;
  const diffMs = now - targetTime;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 0) {
    return `${diffDays}d ago`;
  } else if (diffHours > 0) {
    return `${diffHours}h ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes}m ago`;
  } else {
    return 'now';
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'recurring':
      return 'bg-purple-600';
    case 'backlog':
      return 'bg-zinc-600';
    case 'in_progress':
      return 'bg-blue-600';
    case 'review':
      return 'bg-yellow-600';
    case 'done':
      return 'bg-green-600';
    case 'active':
      return 'bg-green-500';
    case 'idle':
      return 'bg-yellow-500';
    case 'offline':
      return 'bg-zinc-500';
    case 'running':
      return 'bg-blue-500';
    case 'completed':
      return 'bg-green-500';
    case 'failed':
      return 'bg-red-500';
    default:
      return 'bg-zinc-500';
  }
}

export function getTypeColor(type: string): string {
  switch (type) {
    case 'daily':
      return 'bg-blue-600';
    case 'longterm':
      return 'bg-purple-600';
    case 'identity':
      return 'bg-pink-600';
    case 'tools':
      return 'bg-yellow-600';
    case 'soul':
      return 'bg-green-600';
    default:
      return 'bg-zinc-600';
  }
}

export function getAssigneeColor(assignee: string): string {
  switch (assignee.toLowerCase()) {
    case 'emmanuel':
      return 'bg-orange-500';
    case 'lanamour':
      return 'bg-purple-600';
    default:
      return 'bg-zinc-500';
  }
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}