import { TeamMember } from '@/lib/types';
import { AvatarCircle } from './AvatarCircle';
import { StatusBadge } from './StatusBadge';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="team-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <AvatarCircle 
            letter={member.avatar}
            color={member.avatarColor}
            size="lg"
          />
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              {member.name}
              <span className="text-lg">{member.emoji}</span>
            </h3>
            <p className="text-zinc-400 text-sm">{member.role}</p>
          </div>
        </div>
        <StatusBadge status={member.status} size="sm" showDot />
      </div>

      <div className="mb-4">
        <p className="text-zinc-400 text-sm mb-3">{member.model}</p>
        <p className="text-zinc-300 text-sm leading-relaxed">{member.description}</p>
      </div>

      {member.currentTask && (
        <div className="mb-4 p-3 bg-zinc-800 rounded-lg">
          <p className="text-xs font-medium text-zinc-400 mb-1">Current Task</p>
          <p className="text-sm text-white">{member.currentTask}</p>
        </div>
      )}

      <div className="mb-4">
        <p className="text-xs font-medium text-zinc-400 mb-2">Responsibilities</p>
        <div className="flex flex-wrap gap-1">
          {member.responsibilities.slice(0, 3).map((resp, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-md"
            >
              {resp}
            </span>
          ))}
          {member.responsibilities.length > 3 && (
            <span className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-md">
              +{member.responsibilities.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <div>
          <p className="text-zinc-400">Completed</p>
          <p className="text-white font-medium">{member.tasksCompleted}</p>
        </div>
        <div>
          <p className="text-zinc-400">Assigned</p>
          <p className="text-white font-medium">{member.tasksAssigned}</p>
        </div>
      </div>
    </div>
  );
}