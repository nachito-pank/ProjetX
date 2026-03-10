'use client';

import React from 'react';
import { Bell, LogOut, Menu, User } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { cn } from '@/lib/utils';

interface NavbarProps {
  user: {
    name: string;
    role: string;
    notifications: number;
  };
  onToggleSidebar: () => void;
  onLogout: () => void;
}

export const Navbar = ({ user, onToggleSidebar, onLogout }: NavbarProps) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
          icon={<Menu className="w-5 h-5" />}
        />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
            E
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
            EduManage
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="relative group">
          <Button variant="ghost" size="icon" className="relative" icon={<Bell className="w-5 h-5 text-slate-500" />} />
          {user.notifications > 0 && (
            <Badge
              variant="danger"
              className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] border-2 border-white"
            >
              {user.notifications}
            </Badge>
          )}
        </div>

        <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-none">{user.name}</p>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
              {user.role}
            </p>
          </div>
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border-2 border-slate-200 overflow-hidden">
            <User className="w-6 h-6 text-slate-400" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="text-slate-400 hover:text-danger hover:bg-danger/5"
            icon={<LogOut className="w-5 h-5" />}
          />
        </div>
      </div>
    </header>
  );
};
