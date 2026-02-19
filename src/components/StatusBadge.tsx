import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export function StatusBadge({ status, size = 'md', showDot = false }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'recurring':
        return { color: 'bg-purple-600', text: 'Recurring', textColor: 'text-purple-100' };
      case 'backlog':
        return { color: 'bg-zinc-600', text: 'Backlog', textColor: 'text-zinc-100' };
      case 'in_progress':
        return { color: 'bg-blue-600', text: 'In Progress', textColor: 'text-blue-100' };
      case 'review':
        return { color: 'bg-yellow-600', text: 'Review', textColor: 'text-yellow-100' };
      case 'done':
        return { color: 'bg-green-600', text: 'Done', textColor: 'text-green-100' };
      case 'active':
        return { color: 'bg-green-500', text: 'Active', textColor: 'text-green-100' };
      case 'idle':
        return { color: 'bg-yellow-500', text: 'Idle', textColor: 'text-yellow-100' };
      case 'offline':
        return { color: 'bg-zinc-500', text: 'Offline', textColor: 'text-zinc-100' };
      case 'running':
        return { color: 'bg-blue-500', text: 'Running', textColor: 'text-blue-100' };
      case 'completed':
        return { color: 'bg-green-500', text: 'Completed', textColor: 'text-green-100' };
      case 'failed':
        return { color: 'bg-red-500', text: 'Failed', textColor: 'text-red-100' };
      default:
        return { color: 'bg-zinc-500', text: status, textColor: 'text-zinc-100' };
    }
  };

  const config = getStatusConfig(status);
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  if (showDot) {
    return (
      <div className="flex items-center gap-2">
        <div className={cn('w-2 h-2 rounded-full', config.color)} />
        <span className="text-sm text-zinc-400">{config.text}</span>
      </div>
    );
  }

  return (
    <span className={cn(
      'inline-flex items-center rounded-md font-medium',
      config.color,
      config.textColor,
      sizeClasses[size]
    )}>
      {config.text}
    </span>
  );
}