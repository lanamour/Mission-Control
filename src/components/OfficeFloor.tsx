'use client';

import { useState } from 'react';
import { TeamMember } from '@/lib/types';
import { Workstation } from './Workstation';
import { StatusBadge } from './StatusBadge';
import { AvatarCircle } from './AvatarCircle';

interface OfficeFloorProps {
  teamMembers: TeamMember[];
}

export function OfficeFloor({ teamMembers }: OfficeFloorProps) {
  const [selectedAgent, setSelectedAgent] = useState<TeamMember | null>(null);

  const lanamour = teamMembers.find(m => m.type === 'lead');
  const subAgents = teamMembers.filter(m => m.type === 'subagent');

  const handleAgentClick = (agent: TeamMember) => {
    setSelectedAgent(agent);
  };

  return (
    <div className="flex gap-8 h-full">
      {/* Main Office Floor */}
      <div className="flex-1">
        <div className="office-floor bg-zinc-950 rounded-lg border border-zinc-800 p-8 min-h-[600px] relative overflow-hidden">
          {/* Office layout */}
          <div className="relative w-full h-full flex flex-col items-center justify-center space-y-12">
            {/* Lanamour's Corner Office */}
            {lanamour && (
              <div className="relative">
                <div className="absolute -inset-4 bg-purple-900/10 rounded-xl border border-purple-500/20" />
                <Workstation 
                  agent={lanamour}
                  size="large"
                  onClick={() => handleAgentClick(lanamour)}
                />
              </div>
            )}

            {/* Sub-agent workstations in 2 rows */}
            <div className="space-y-8">
              {/* First row */}
              <div className="flex justify-center gap-12">
                {subAgents.slice(0, 3).map(agent => (
                  <Workstation 
                    key={agent.id}
                    agent={agent}
                    onClick={() => handleAgentClick(agent)}
                  />
                ))}
              </div>

              {/* Second row */}
              <div className="flex justify-center gap-12">
                {subAgents.slice(3).map(agent => (
                  <Workstation 
                    key={agent.id}
                    agent={agent}
                    onClick={() => handleAgentClick(agent)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Blueprint grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Status Panel */}
      <div className="w-80 bg-zinc-900 border border-zinc-800 rounded-lg">
        <div className="p-6 border-b border-zinc-800">
          <h3 className="text-lg font-semibold text-white">Agent Status</h3>
          <p className="text-sm text-zinc-400 mt-1">Real-time network overview</p>
        </div>

        <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
          {teamMembers.map(agent => (
            <div
              key={agent.id}
              className="p-4 bg-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-700 transition-colors"
              onClick={() => handleAgentClick(agent)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <AvatarCircle 
                    letter={agent.avatar}
                    color={agent.avatarColor}
                    size="sm"
                  />
                  <div>
                    <p className="text-white font-medium text-sm flex items-center gap-1">
                      {agent.name}
                      <span className="text-xs">{agent.emoji}</span>
                    </p>
                    <p className="text-zinc-400 text-xs">{agent.role}</p>
                  </div>
                </div>
                <StatusBadge status={agent.status} size="sm" showDot />
              </div>

              {agent.currentTask && (
                <div className="mt-2 p-2 bg-zinc-900 rounded text-xs">
                  <p className="text-zinc-400 mb-1">Current Task:</p>
                  <p className="text-zinc-300">{agent.currentTask}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick stats */}
        <div className="p-6 border-t border-zinc-800">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {teamMembers.filter(a => a.status === 'active').length}
              </p>
              <p className="text-sm text-zinc-400">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {teamMembers.reduce((sum, a) => sum + a.tasksCompleted, 0)}
              </p>
              <p className="text-sm text-zinc-400">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <AvatarCircle 
                    letter={selectedAgent.avatar}
                    color={selectedAgent.avatarColor}
                    size="lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      {selectedAgent.name}
                      <span>{selectedAgent.emoji}</span>
                    </h3>
                    <p className="text-zinc-400">{selectedAgent.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAgent(null)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <StatusBadge status={selectedAgent.status} showDot />
                  <span className="text-zinc-400 text-sm">{selectedAgent.model}</span>
                </div>

                <div>
                  <p className="text-zinc-300 leading-relaxed">{selectedAgent.description}</p>
                </div>

                {selectedAgent.currentTask && (
                  <div className="p-4 bg-zinc-800 rounded-lg">
                    <p className="text-sm font-medium text-zinc-400 mb-1">Current Task</p>
                    <p className="text-white">{selectedAgent.currentTask}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-zinc-400 mb-3">Responsibilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.responsibilities.map((resp, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-md"
                      >
                        {resp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-zinc-400 mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-purple-900/30 text-purple-200 text-sm rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-zinc-800">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white">{selectedAgent.tasksCompleted}</p>
                    <p className="text-sm text-zinc-400">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white">{selectedAgent.tasksAssigned}</p>
                    <p className="text-sm text-zinc-400">Assigned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}