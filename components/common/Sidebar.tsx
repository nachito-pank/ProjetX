"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  GraduationCap,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  BarChart3,
  Award,
  MessageSquare,
  Home,
  HelpCircle
} from 'lucide-react';
import { UserRole } from './types';

interface SidebarProps {
  role: UserRole;
  collapsed?: boolean;
  onToggle?: () => void;
}

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ role, collapsed: initialCollapsed = false, onToggle }) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const pathname = usePathname();

  const handleToggle = () => {
    setCollapsed(!collapsed);
    onToggle?.();
  };

  const handleLogout = () => {
    console.log('Déconnexion...');
    // Implémentez votre logique de déconnexion ici
  };

  // Configuration des menus par rôle
  const getMenuItems = (): MenuItem[] => {
    const commonItems: MenuItem[] = [
      { name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: `/${role}/dashbard` },
    ];

    const roleSpecificItems: Record<UserRole, MenuItem[]> = {
      admin: [
        { name: 'Utilisateurs', icon: <Users className="h-5 w-5" />, path: '/admin/utilisateurs', badge: 12 },
        { name: 'Cours', icon: <BookOpen className="h-5 w-5" />, path: '/admin/cours' },
        { name: 'Statistiques', icon: <BarChart3 className="h-5 w-5" />, path: '/admin/statistiques' },
        { name: 'Rapports', icon: <FileText className="h-5 w-5" />, path: '/admin/rapports' },
        { name: 'Paramètres', icon: <Settings className="h-5 w-5" />, path: '/admin/parametres' },
      ],
      'sous-admin': [
        { name: 'Cours', icon: <BookOpen className="h-5 w-5" />, path: '/sous-admin/cours', badge: 7 },
        { name: 'Étudiants', icon: <GraduationCap className="h-5 w-5" />, path: '/sous-admin/etudiants' },
        { name: 'Validations', icon: <Award className="h-5 w-5" />, path: '/sous-admin/validations' },
        { name: 'Statistiques', icon: <BarChart3 className="h-5 w-5" />, path: '/sous-admin/statistiques' },
        { name: 'Paramètres', icon: <Settings className="h-5 w-5" />, path: '/sous-admin/parametres' },
      ],
      enseignant: [
        { name: 'Mes Cours', icon: <BookOpen className="h-5 w-5" />, path: '/enseignant/mes-cours' },
        { name: 'Étudiants', icon: <Users className="h-5 w-5" />, path: '/enseignant/etudiants' },
        { name: 'Notes', icon: <Award className="h-5 w-5" />, path: '/enseignant/notes' },
        { name: 'Présences', icon: <Calendar className="h-5 w-5" />, path: '/enseignant/presences' },
        { name: 'Messages', icon: <MessageSquare className="h-5 w-5" />, path: '/enseignant/messages', badge: 3 },
      ],
      etudiant: [
        { name: 'Mes Cours', icon: <BookOpen className="h-5 w-5" />, path: '/etudiant/mes-cours' },
        { name: 'Devoirs', icon: <FileText className="h-5 w-5" />, path: '/etudiant/devoirs', badge: 5 },
        { name: 'Notes', icon: <Award className="h-5 w-5" />, path: '/etudiant/mes-notes' },
        { name: 'Emploi du temps', icon: <Calendar className="h-5 w-5" />, path: '/etudiant/emploi-temps' },
        { name: 'Messages', icon: <MessageSquare className="h-5 w-5" />, path: '/etudiant/messages' },
      ],
      visitor: [],
    };

    return [...commonItems, ...(roleSpecificItems[role] || [])];
  };

  const menuItems = getMenuItems();

  // Menu du bas (supplémentaire)
  const bottomMenuItems: MenuItem[] = [
    { name: 'Aide', icon: <HelpCircle className="h-5 w-5" />, path: '/aide' },
  ];

  // Ne pas afficher le sidebar pour les visiteurs
  if (role === 'visitor') return null;

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 border-r border-blue-100 dark:border-gray-700 h-screen fixed left-0 top-16 transition-all duration-300 z-20 shadow-lg`}
    >
      {/* Bouton de toggle avec style bleu */}
      <button
        onClick={handleToggle}
        className="absolute -right-3 top-5 bg-blue-600 dark:bg-blue-500 border-2 border-white dark:border-gray-900 rounded-full p-1.5 shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-white"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* En-tête du sidebar avec style bleu */}
      <div className="p-4 border-b border-blue-100 dark:border-gray-700">
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-md">
              {role === 'admin' && '👑'}
              {role === 'sous-admin' && '🔰'}
              {role === 'enseignant' && '👨‍🏫'}
              {role === 'etudiant' && '👨‍🎓'}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {role === 'sous-admin' ? 'Sous-Admin' : role.charAt(0).toUpperCase() + role.slice(1)}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Espace {role}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-md">
              {role === 'admin' && '👑'}
              {role === 'sous-admin' && '🔰'}
              {role === 'enseignant' && '👨‍🏫'}
              {role === 'etudiant' && '👨‍🎓'}
            </div>
          </div>
        )}
      </div>

      {/* Menu de navigation principal */}
      <nav className="p-4 h-[calc(100vh-180px)] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-gray-600">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center ${
                    collapsed ? 'justify-center' : 'justify-between'
                  } p-3 rounded-xl transition-all duration-200 relative group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-xl ${isActive ? 'text-white' : 'text-blue-500 dark:text-blue-400'}`}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>
                        {item.name}
                      </span>
                    )}
                  </div>
                  
                  {/* Badge pour les notifications */}
                  {!collapsed && item.badge && (
                    <span className={`${
                      isActive 
                        ? 'bg-white text-blue-600' 
                        : 'bg-blue-500 text-white'
                    } text-xs font-bold rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center shadow-sm`}>
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip pour le mode réduit */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Menu du bas */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-100 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <ul className="space-y-1">
          {bottomMenuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center ${
                  collapsed ? 'justify-center' : 'space-x-3'
                } p-3 rounded-xl transition-all duration-200 ${
                  pathname === item.path
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <span className={`text-xl ${
                  pathname === item.path ? 'text-white' : 'text-blue-500 dark:text-blue-400'
                }`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
          
          {/* Bouton de déconnexion */}
          <li>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full ${
                collapsed ? 'justify-center' : 'space-x-3'
              } p-3 rounded-xl transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 group`}
            >
              <LogOut className="h-5 w-5 text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform" />
              {!collapsed && (
                <span className="text-sm font-medium">Déconnexion</span>
              )}
            </button>
          </li>
        </ul>

        {/* Version info (optionnel) */}
        {!collapsed && (
          <div className="mt-4 pt-4 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Version 2.0.0
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;