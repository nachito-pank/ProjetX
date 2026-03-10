'use client';

import React, { useState } from 'react';
import Sidebar from '@/components1/common/Sidebar';
import Navbar from '@/components1/common/Navbar';
import { Button } from '@/components1/common/Button';
import { FormField } from '@/components1/common/FormField';

export default function ProfilPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'Okemba Smiley Chado',
    email: 'smiley@example.com',
    phone: '+243 999 999 999',
    matiere: 'Informatique',
  });

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Infos sauvegardées:', user);
    alert('Profil mis à jour !'); // ici tu peux appeler ton API
  };

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar
          user={{ name: user.name, role: 'Enseignant', notifications: 3 }}
          onToggleSidebar={handleToggleSidebar}
          onLogout={() => console.log('Déconnexion')}
        />

        <main className="p-6 bg-slate-50 flex-1">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Mon Profil</h2>

          <div className="bg-white p-6 rounded-lg shadow max-w-lg">
            <FormField
              label="Nom"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
            />
            <FormField
              label="Téléphone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
            <FormField
              label="Matière"
              name="matiere"
              value={user.matiere}
              onChange={handleChange}
            />

            <Button onClick={handleSave} className="mt-4 bg-blue-600 text-white hover:bg-blue-700">
              Sauvegarder
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}