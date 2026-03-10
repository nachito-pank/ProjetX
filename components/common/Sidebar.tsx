'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCog,
  BookOpen,
  Calendar,
  MessageSquare,
  FileText,
  CreditCard,
  User,
  Bell,
  ChevronRight,
  GraduationCap,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Role = 'admin' | 'sous-admin' | 'enseignant' | 'etudiant';

interface SidebarProps {
  role: Role;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: Record<Role, { label: string; href: string; icon: any }[]> = {
  admin: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Enseignants', href: '/admin/enseignants', icon: Users },
    { label: 'Sous-Admins', href: '/admin/sous-admins', icon: UserCog },
    { label: 'Filières', href: '/admin/filieres', icon: BookOpen },
    { label: 'Profil', href: '/admin/profil', icon: Settings },
  ],
  'sous-admin': [
    { label: 'Dashboard', href: '/sous-admin/dashboard', icon: LayoutDashboard },
    { label: 'Actualités', href: '/sous-admin/actualites', icon: Bell },
    { label: 'Emploi du temps', href: '/sous-admin/emplois-du-temps', icon: Calendar },
    { label: 'Messages', href: '/sous-admin/messages', icon: MessageSquare },
  ],
  enseignant: [
    { label: 'Dashboard', href: '/enseignant/profil', icon: User },
    { label: 'Mes Cours', href: '/enseignant/cours', icon: BookOpen },
    { label: 'Mes Étudiants', href: '/enseignant/etudiants', icon: GraduationCap },
    { label: 'Notes Devoirs', href: '/enseignant/notes/devoirs', icon: FileText },
    { label: 'Notes Sessions', href: '/enseignant/notes/sessions', icon: FileText },
    { label: 'Emploi du temps', href: '/enseignant/emploi-du-temps', icon: Calendar },
  ],
  etudiant: [
    { label: 'Dashboard', href: '/etudiant/dashboard', icon: LayoutDashboard },
    { label: 'EDT Cours', href: '/etudiant/emploi-du-temps/cours', icon: Calendar },
    { label: 'EDT Sessions', href: '/etudiant/emploi-du-temps/sessions', icon: Calendar },
    { label: 'Notes & Moyenne', href: '/etudiant/notes', icon: FileText },
    { label: 'Paiements', href: '/etudiant/paiements', icon: CreditCard },
    { label: 'Notifications', href: '/etudiant/notifications', icon: Bell },
    { label: 'Profil', href: '/etudiant/profil', icon: User },
  ],
};

export const Sidebar = ({ role, isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-200 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-100 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              E
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">EduManage</h1>
          </div>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)] lg:h-full">
          {menuItems[role].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-xl transition-all group',
                  isActive
                    ? 'bg-primary text-slate-500 shadow-md shadow-primary/20'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary')} />
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
