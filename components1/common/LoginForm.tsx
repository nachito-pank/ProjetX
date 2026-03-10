'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { Button } from './Button';
import FormField from '@/components1/common/FormField';
import { Card } from './Card';
import { useToast } from './Toast';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    
    // Simulate login logic
    setTimeout(() => {
      setLoading(false);
      if (email.includes('admin')) {
        window.location.href = '/admin/dashboard';
      } else if (email.includes('sous')) {
        window.location.href = '/sous-admin/dashboard';
      } else if (email.includes('enseignant')) {
        window.location.href = '/enseignant/dashboard';
      } else if (email.includes('etudiant')) {
        window.location.href = '/etudiant/dashboard';
      } else {
        showToast('Identifiants incorrects', 'error');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-black font-bold text-3xl mx-auto mb-4 shadow-lg shadow-primary/20">
            
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">ECES</h1>
          <p className="text-slate-500 font-medium mt-1">Connectez-vous à votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Email ou identifiant"
            name="email"
            placeholder="admin@edumanage.com"
            required
            icon={<User className="w-4 h-4" />}
            className='text-black'
          />
          
          <div className="relative">
            <FormField
              label="Mot de passe"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              required
              icon={<Lock className="w-4 h-4" />}
              className='text-black'
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-secondary" />
              <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-sm font-bold text-primary hover:underline">Mot de passe oublié ?</a>
          </div>

          <Button type="submit" className="w-full h-12 text-base" loading={loading}>
            Se connecter
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Besoin d&apos;aide ? <a href="#" className="text-primary font-bold hover:underline">Contactez le support</a>
          </p>
        </div>
      </Card>
    </div>
  );
};
