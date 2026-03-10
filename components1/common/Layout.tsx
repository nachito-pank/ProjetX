'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ToastProvider } from './Toast';
import { getStoredEnseignantProfile } from '@/lib/enseignant-profile';

type Role = 'admin' | 'sous-admin' | 'enseignant' | 'etudiant';

interface LayoutProps {
  children: React.ReactNode;
  role: Role;
  user: {
    name: string;
    role: string;
    notifications: number;
    avatarUrl?: string | null;
  };
}

export const Layout = ({ children, role, user }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [displayUser, setDisplayUser] = useState(user);

  useEffect(() => {
    if (role === 'enseignant') {
      const stored = getStoredEnseignantProfile();
      if (stored) {
        setDisplayUser((prev) => ({
          ...prev,
          name: stored.name,
          avatarUrl: stored.avatarUrl,
        }));
      } else {
        setDisplayUser(user);
      }
    } else {
      setDisplayUser(user);
    }
  }, [role, user, pathname]);

  const handleLogout = () => {
    // In a real app, this would clear the session
    window.location.href = '/login';
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex bg-slate-50">
        <Sidebar role={role} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
          <Navbar 
            user={displayUser} 
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            onLogout={handleLogout} 
          />
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};
