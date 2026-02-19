'use client';

import { SearchBar } from './SearchBar';
import { Breadcrumbs } from './Breadcrumbs';
import { useSidebar } from './SidebarProvider';

export function TopBar() {
  const { setOpen } = useSidebar();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {/* Hamburger - mobile only */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-lg text-[var(--mc-text-muted)] hover:text-[var(--mc-text)] hover:bg-[var(--mc-hover)] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect y="3" width="20" height="2" rx="1" />
            <rect y="9" width="20" height="2" rx="1" />
            <rect y="15" width="20" height="2" rx="1" />
          </svg>
        </button>
        <SearchBar />
      </div>
      <Breadcrumbs />
    </div>
  );
}
