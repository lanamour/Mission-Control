import { teamMembers } from '@/lib/mockData';
import { OfficeFloor } from '@/components/OfficeFloor';

export default function OfficePage() {
  const activeAgents = teamMembers.filter(m => m.status === 'active').length;
  const idleAgents = teamMembers.filter(m => m.status === 'idle').length;
  const totalTasksCompleted = teamMembers.reduce((sum, m) => sum + m.tasksCompleted, 0);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Digital Office</h1>
        <p className="text-zinc-400">Interactive view of the agent network workspace</p>
      </div>

      {/* Office Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
              <p className="text-sm text-zinc-400">Total Agents</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-400">{activeAgents}</p>
              <p className="text-sm text-zinc-400">Active Now</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">⚡</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-yellow-400">{idleAgents}</p>
              <p className="text-sm text-zinc-400">Idle</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">💤</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{totalTasksCompleted}</p>
              <p className="text-sm text-zinc-400">Tasks Done</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
        <p className="text-zinc-300 text-sm">
          <span className="text-purple-400 font-medium">Welcome to the Digital Office!</span> 
          {' '}Click on any workstation to view agent details. Active agents glow and show their current tasks on monitors.
        </p>
      </div>

      {/* Office Floor */}
      <div className="flex-1">
        <OfficeFloor teamMembers={teamMembers} />
      </div>
    </div>
  );
}