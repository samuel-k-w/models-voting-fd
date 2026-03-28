'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface TopbarProps {
  title?: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="border-b border-border bg-white dark:bg-muted sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Title */}
        <div>
          {title && (
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          )}
          {subtitle && (
            <p className="text-sm text-foreground/60 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Live Status */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/10 border border-success/30">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-xs font-medium text-success">Live</span>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                AD
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:inline">Admin</span>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-muted border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <p className="text-sm font-medium text-foreground">admin@voting.app</p>
                  <p className="text-xs text-foreground/60 mt-1">Administrator</p>
                </div>
                <div className="p-2 space-y-1">
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded transition-colors text-foreground">
                    Profile
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded transition-colors text-foreground">
                    Settings
                  </button>
                  <Link
                    href="/voting"
                    className="block px-3 py-2 text-sm hover:bg-accent rounded transition-colors text-foreground"
                  >
                    View Voting
                  </Link>
                </div>
                <div className="p-2 border-t border-border">
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-error/10 rounded transition-colors text-error font-medium">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
