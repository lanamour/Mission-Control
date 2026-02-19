import { teamMembers, agentRuns } from '@/lib/mockData';
import { TeamHeroCard } from '@/components/TeamHeroCard';
import { TeamMemberCard } from '@/components/TeamMemberCard';
import { ActivityFeed } from '@/components/ActivityFeed';

export default function TeamPage() {
  const leadAgent = teamMembers.find(m => m.type === 'lead');
  const subAgents = teamMembers.filter(m => m.type === 'subagent');
  
  const activeAgents = teamMembers.filter(m => m.status === 'active').length;
  const totalTasksCompleted = teamMembers.reduce((sum, m) => sum + m.tasksCompleted, 0);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Team</h1>
            <p className="text-xl text-purple-400 font-medium">Lanamour's Agent Network</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-400">
              {teamMembers.length} agents • {activeAgents} active • {totalTasksCompleted} tasks completed
            </p>
          </div>
        </div>
      </div>

      {/* Lead Agent Hero Card */}
      {leadAgent && (
        <div className="mb-8">
          <TeamHeroCard member={leadAgent} />
        </div>
      )}

      {/* Sub-Agents Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Specialist Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subAgents.map(agent => (
            <TeamMemberCard key={agent.id} member={agent} />
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="flex-1">
        <ActivityFeed runs={agentRuns} />
      </div>
    </div>
  );
}