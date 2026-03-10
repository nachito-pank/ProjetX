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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-white to-blue-200">

      <Card className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl border border-blue-100">

        <div className="text-center mb-8">

          {/* Logo */}
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-white shadow-lg border border-blue-100 overflow-hidden">
            <img
              src="/ECES.png"
              alt="Logo ECES"
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold text-blue-700 tracking-tight">
            ECES
          </h1>

          <p className="text-gray-500 mt-2">
            Plateforme académique
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <FormField
            label="Email ou identifiant"
            name="email"
            placeholder="admin@eces.com"
            required
            icon={<User className="w-4 h-4" />}
            className="text-black"
          />
          
          <div className="relative">

            <FormField
              label="Mot de passe"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              required
              icon={<Lock className="w-4 h-4" />}
              className="text-black"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-blue-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>

          </div>

          <div className="flex items-center justify-between">

            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
              />
              <span className="text-sm text-gray-500 group-hover:text-gray-700">
                Se souvenir de moi
              </span>
            </label>

            <a
              href="#"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Mot de passe oublié ?
            </a>

          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 text-white"
            loading={loading}
          >
            Se connecter
          </Button>

        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">

          <p className="text-sm text-gray-500">
            Besoin d'aide ?{' '}
            <a
              href="#"
              className="text-blue-600 font-semibold hover:underline"
            >
              Contactez le support
            </a>
          </p>

        </div>

      </Card>
    </div>
  );
};