'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AvatarCircle } from './AvatarCircle';
import { useTheme } from './ThemeProvider';
import { useSidebar } from './SidebarProvider';

const navItems = [
  { name: 'Dashboard', href: '/', icon: '🏠' },
  { name: 'GTCP', href: '/gtcp', icon: '🏎️' },
  { name: 'Portfolio', href: '/portfolio', icon: '💎' },
  { name: 'Wallet', href: '/wallet', icon: '⟠' },
  { name: 'Tasks', href: '/tasks', icon: '✓' },
  { name: 'Calendar', href: '/calendar', icon: '📅' },
  { name: 'Memory', href: '/memory', icon: '🧠' },
  { name: 'Email', href: '/email', icon: '📧' },
  { name: 'Activity', href: '/activity', icon: '⚡' },
  { name: 'Moltbook', href: '/moltbook', icon: '🦞' },
  { name: 'Team', href: '/team', icon: '👥' },
  { name: 'Office', href: '/office', icon: '🏢' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const { open, setOpen } = useSidebar();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-screen w-60 bg-[var(--mc-sidebar)] border-r border-[var(--mc-border)] flex flex-col z-50 transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[var(--mc-border)]">
          <h1 className="text-xl font-bold text-[var(--mc-text)]">Mission Control</h1>
          <p className="text-sm text-[var(--mc-text-muted)] mt-1">Agent Network</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = mounted && (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)));
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-600 text-white'
                        : 'text-[var(--mc-text-muted)] hover:text-[var(--mc-text)] hover:bg-[var(--mc-hover)]'
                    }`}
                  >
                    <span className="text-lg" suppressHydrationWarning>{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Theme toggle */}
        <div className="px-4 pb-2">
          <button
            onClick={toggle}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--mc-text-muted)] hover:text-[var(--mc-text)] hover:bg-[var(--mc-hover)] transition-colors"
          >
            <span className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</span>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* Agent Section */}
        <div className="p-4 border-t border-[var(--mc-border)]">
          <div className="flex items-center gap-3">
            <img src="https://www.larvalabs.com/cryptopunks/cryptopunk7294.png" width="36" height="36" alt="Lanamour" className="rounded-lg" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--mc-text)]">Lanamour</p>
              <p className="text-xs text-[var(--mc-text-muted)] truncate">lanamour@lanamour.net</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
