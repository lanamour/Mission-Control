import { TeamMember } from '@/lib/types';
import { AvatarCircle } from './AvatarCircle';
import { StatusBadge } from './StatusBadge';

interface TeamHeroCardProps {
  member: TeamMember;
}

export function TeamHeroCard({ member }: TeamHeroCardProps) {
  return (
    <div className="team-hero-card">
      <div className="flex items-start gap-6">
        <AvatarCircle 
          letter={member.avatar}
          color={member.avatarColor}
          size="xl"
          className="ring-4 ring-purple-500/20"
        />
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              {member.name}
              <span className="text-2xl">{member.emoji}</span>
            </h2>
            <StatusBadge status={member.status} showDot />
          </div>
          
          <div className="flex items-center gap-4 mb-4 text-sm text-zinc-400">
            <span>{member.role}</span>
            <span>•</span>
            <span>{member.model}</span>
          </div>

          <p className="text-zinc-300 mb-6 leading-relaxed max-w-2xl">
            {member.description}
          </p>

          {member.currentTask && (
            <div className="mb-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <p className="text-sm font-medium text-purple-300 mb-1">Currently Working On</p>
              <p className="text-white">{member.currentTask}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-zinc-400 mb-3">Key Responsibilities</h4>
              <div className="flex flex-wrap gap-2">
                {member.responsibilities.map((resp, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-purple-900/30 text-purple-200 text-sm rounded-full border border-purple-500/30"
                  >
                    {resp}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-zinc-400 mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-zinc-800 text-zinc-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-8 mt-6 pt-6 border-t border-purple-500/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{member.tasksCompleted}</p>
              <p className="text-sm text-zinc-400">Tasks Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{member.tasksAssigned}</p>
              <p className="text-sm text-zinc-400">Tasks Assigned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">98%</p>
              <p className="text-sm text-zinc-400">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}