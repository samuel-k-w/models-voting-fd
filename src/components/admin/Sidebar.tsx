'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: '📊',
  },
  {
    label: 'Models',
    href: '/admin/models',
    icon: '👤',
  },
  {
    label: 'Voting Control',
    href: '/admin/voting',
    icon: '🗳️',
  },
  {
    label: 'Analytics',
    href: '/admin/analytics',
    icon: '📈',
  },
  {
    label: 'Rounds',
    href: '/admin/rounds',
    icon: '🔄',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-white dark:bg-muted h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Admin Panel</h2>
        <p className="text-xs text-foreground/60 mt-1">Voting Platform</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {sidebarItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm',
                {
                  'bg-primary text-white': isActive,
                  'text-foreground hover:bg-accent': !isActive,
                }
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-foreground/60 text-center">
          v1.0.0
        </p>
      </div>
    </aside>
  );
}
