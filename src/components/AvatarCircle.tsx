interface AvatarCircleProps {
  letter: string;
  color: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function AvatarCircle({ letter, color, size = 'md', className = '' }: AvatarCircleProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  return (
    <div 
      className={`rounded-full flex items-center justify-center font-semibold text-white ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: color }}
    >
      {letter}
    </div>
  );
}