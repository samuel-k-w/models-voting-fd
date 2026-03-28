import type { Metadata } from 'next';
import { Sidebar } from '@/components/admin/Sidebar';
import { Topbar } from '@/components/admin/Topbar';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Real-Time Voting Platform',
  description: 'Manage models, voting, and analytics',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-background via-accent to-background">
          {children}
        </main>
      </div>
    </div>
  );
}
