'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  accentColor?: 'primary' | 'danger' | 'success' | 'warning' | 'admin' | 'sous-admin' | 'enseignant' | 'etudiant' | 'communs';
}

export const Card = ({ title, children, className, icon, accentColor }: CardProps) => {
  const accentClasses = {
    primary: 'border-l-4 border-l-primary',
    danger: 'border-l-4 border-l-danger',
    success: 'border-l-4 border-l-success',
    warning: 'border-l-4 border-l-warning',
    admin: 'border-l-4 border-l-admin',
    'sous-admin': 'border-l-4 border-l-sous-admin',
    enseignant: 'border-l-4 border-l-enseignant',
    etudiant: 'border-l-4 border-l-etudiant',
    communs: 'border-l-4 border-l-communs',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md',
        accentColor && accentClasses[accentColor],
        className
      )}
    >
      {(title || icon) && (
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className="p-2 bg-slate-50 rounded-lg text-slate-600">{icon}</div>}
            {title && <h3 className="font-bold text-slate-800 tracking-tight">{title}</h3>}
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
