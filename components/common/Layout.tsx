'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { ToastProvider } from './Toast';

type Role = 'admin' | 'sous-admin' | 'enseignant' | 'etudiant';

interface LayoutProps {
  children: React.ReactNode;
  role: Role;
  user: {
    name: string;
    role: string;
    notifications: number;
  };
}

export const Layout = ({ children, role, user }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, this would clear the session
    window.location.href = '/login';
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex bg-slate-50">
        <Sidebar role={role} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar 
            user={user} 
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
