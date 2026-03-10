'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, GraduationCap, FileText, Calendar, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role?: string;
}

const menuItems = [
  { label: 'Dashboard', href: '/enseignant/dashboard', icon: LayoutDashboard },
  { label: 'Mes Cours', href: '/enseignant/cours', icon: BookOpen },
  { label: 'Mes Étudiants', href: '/enseignant/etudiants', icon: GraduationCap },
  { label: 'Notes Devoirs', href: '/enseignant/notes/devoirs', icon: FileText },
  { label: 'Notes Sessions', href: '/enseignant/notes/sessions', icon: FileText },
  { label: 'Emploi du temps', href: '/enseignant/emploi-du-temps', icon: Calendar },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          'fixed top-16 left-0 h-[calc(100%-4rem)] w-72 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 lg:translate-x-0',
    isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100%-4rem)]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-lg transition-all group',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn('w-5 h-5', isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600')}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-white" />}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}