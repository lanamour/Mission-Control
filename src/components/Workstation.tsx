import { TeamMember } from '@/lib/types';
import { AvatarCircle } from './AvatarCircle';

interface WorkstationProps {
  agent: TeamMember;
  size?: 'normal' | 'large';
  position?: string;
  onClick?: () => void;
}

export function Workstation({ agent, size = 'normal', onClick }: WorkstationProps) {
  const isActive = agent.status === 'active';
  const isIdle = agent.status === 'idle';
  const isLead = agent.type === 'lead';
  
  const workstationSize = size === 'large' ? 'w-48 h-32' : 'w-32 h-24';
  const deskSize = size === 'large' ? 'w-44 h-16' : 'w-28 h-12';
  const monitorSize = size === 'large' ? 'w-12 h-8' : 'w-8 h-6';
  const avatarSize = size === 'large' ? 'lg' : 'md';

  return (
    <div 
      className={`workstation relative ${workstationSize} cursor-pointer group`}
      onClick={onClick}
    >
      {/* Workstation base */}
      <div className="absolute bottom-0 w-full flex flex-col items-center">
        {/* Desk */}
        <div 
          className={`${deskSize} bg-zinc-800 rounded-t-lg border-t-2 border-x-2 border-zinc-600 relative`}
          style={{
            background: `linear-gradient(180deg, #3f3f46 0%, #27272a 100%)`,
            boxShadow: isActive ? `0 0 20px ${agent.avatarColor}40` : 'none'
          }}
        >
          {/* Monitor */}
          <div 
            className={`${monitorSize} bg-zinc-900 border border-zinc-600 rounded absolute top-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-xs font-mono overflow-hidden`}
            style={{
              boxShadow: isActive ? `0 0 10px ${agent.avatarColor}80` : 'none',
              backgroundColor: isActive ? '#111' : '#27272a'
            }}
          >
            {isActive && agent.currentTask ? (
              <span className="text-green-400 text-xs px-1 blink-cursor animate-pulse">
                {agent.currentTask.slice(0, 8)}...
              </span>
            ) : isActive ? (
              <span className="text-green-400">{agent.emoji}</span>
            ) : isIdle ? (
              <span className="text-yellow-400">💤</span>
            ) : (
              <div className="bg-zinc-700 w-full h-full" />
            )}
          </div>

          {/* Chair */}
          <div className={`absolute ${size === 'large' ? '-bottom-3' : '-bottom-2'} left-1/2 transform -translate-x-1/2`}>
            <div className={`${size === 'large' ? 'w-8 h-6' : 'w-6 h-4'} bg-zinc-700 rounded-b-full border border-zinc-600`} />
          </div>

          {/* Avatar (agent at desk) */}
          {(isActive || isIdle) && (
            <div 
              className={`absolute ${size === 'large' ? '-bottom-8' : '-bottom-6'} left-1/2 transform -translate-x-1/2 status-transition`}
              style={{ 
                opacity: isActive ? 1 : 0.6,
                filter: isActive ? 'none' : 'grayscale(20%)'
              }}
            >
              <AvatarCircle 
                letter={agent.avatar}
                color={agent.avatarColor}
                size={avatarSize}
                className={isActive ? 'pulse-glow' : ''}
              />
            </div>
          )}
        </div>

        {/* Name plate */}
        <div className={`mt-2 text-center ${size === 'large' ? 'px-2' : 'px-1'}`}>
          <p className={`font-medium text-white ${size === 'large' ? 'text-sm' : 'text-xs'}`}>
            {agent.name}
          </p>
          {size === 'large' && (
            <p className="text-xs text-zinc-400 mt-1">{agent.role}</p>
          )}
        </div>

        {/* Status indicator */}
        <div className={`mt-1 flex items-center gap-1 ${size === 'large' ? '' : 'scale-75'}`}>
          <div 
            className={`w-2 h-2 rounded-full ${
              isActive ? 'bg-green-500 animate-pulse' : 
              isIdle ? 'bg-yellow-500' : 
              'bg-zinc-500'
            }`} 
          />
          <span className="text-xs text-zinc-400 capitalize">{agent.status}</span>
        </div>
      </div>

      {/* Glow effect for lead agent */}
      {isLead && isActive && (
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: `radial-gradient(ellipse at center, ${agent.avatarColor}20 0%, transparent 70%)`,
            animation: 'pulse-glow 3s ease-in-out infinite'
          }}
        />
      )}

      {/* Hover tooltip */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        <div className="bg-zinc-800 text-white text-sm px-3 py-2 rounded-lg border border-zinc-600 whitespace-nowrap shadow-lg">
          <p className="font-medium">{agent.name} ({agent.emoji})</p>
          <p className="text-zinc-400 text-xs">{agent.role}</p>
          {agent.currentTask && (
            <p className="text-zinc-300 text-xs mt-1">
              {agent.currentTask}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}