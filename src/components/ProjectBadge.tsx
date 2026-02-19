interface ProjectBadgeProps {
  name: string;
  color: string;
  size?: 'sm' | 'md';
}

export function ProjectBadge({ name, color, size = 'md' }: ProjectBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full font-medium text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: color }}
    >
      {name}
    </span>
  );
}