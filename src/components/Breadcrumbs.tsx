'use client';

import { usePathname } from 'next/navigation';

const nameMap: Record<string, string> = {
  '': 'Dashboard',
  tasks: 'Tasks',
  calendar: 'Calendar',
  memory: 'Memory',
  team: 'Team',
  office: 'Office',
  activity: 'Activity',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const pageName = nameMap[segments[0] || ''] || segments[0] || 'Tasks';

  return (
    <nav className="flex items-center gap-2 text-sm text-[var(--mc-text-muted)]">
      <a href="/" className="hover:text-[var(--mc-text)] transition-colors">Mission Control</a>
      <span>›</span>
      <span className="text-[var(--mc-text)] font-medium">{pageName}</span>
    </nav>
  );
}
