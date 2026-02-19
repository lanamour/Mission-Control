import { AgentRun } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { formatTimeAgo } from '@/lib/utils';

interface ActivityFeedProps {
  runs: AgentRun[];
}

export function ActivityFeed({ runs }: ActivityFeedProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg">
      <div className="p-6 border-b border-zinc-800">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <p className="text-sm text-zinc-400 mt-1">Latest agent runs and task completions</p>
      </div>

      <div className="divide-y divide-zinc-800">
        {runs.map((run, index) => (
          <div key={index} className="p-6 hover:bg-zinc-800/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{run.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{run.agentName}</span>
                    <StatusBadge status={run.status} size="sm" />
                  </div>
                  <p className="text-zinc-400 text-sm mt-1">{run.task}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-zinc-400 text-sm">
                  {formatTimeAgo(run.startedAt)}
                </p>
                {run.duration && (
                  <p className="text-zinc-500 text-xs mt-1">
                    Duration: {run.duration}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {runs.length === 0 && (
        <div className="p-8 text-center text-zinc-500">
          <p>No recent activity</p>
        </div>
      )}
    </div>
  );
}