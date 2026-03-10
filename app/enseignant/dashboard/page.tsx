'use client';

import React, { useState } from 'react';
import Sidebar from '@/components1/common/Sidebar';
import Navbar from '@/components1/common/Navbar';
import { Card } from '@/components1/common/Card';
import { Button } from '@/components1/common/Button';
import FormField from '@/components1/common/FormField';
import { BookOpen, GraduationCap, Calendar, ChevronRight, User, Mail, Phone, BookOpenText, Pencil } from 'lucide-react';
import Link from 'next/link';
import enseignantData from '@/data/enseignant.json';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    firstName: enseignantData.profile.firstName,
    name: enseignantData.profile.name,
    email: enseignantData.profile.email,
    phone: (enseignantData.profile as { phone?: string }).phone || '',
    matiere: Array.isArray(enseignantData.profile.subjects)
      ? enseignantData.profile.subjects.join(', ')
      : '',
  });

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => {
    console.log('Déconnexion');
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    console.log('Profil sauvegardé:', profile);
    alert('Profil mis à jour !');
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setProfile({
      firstName: enseignantData.profile.firstName,
      name: enseignantData.profile.name,
      email: enseignantData.profile.email,
      phone: (enseignantData.profile as { phone?: string }).phone || '',
      matiere: Array.isArray(enseignantData.profile.subjects)
        ? enseignantData.profile.subjects.join(', ')
        : '',
    });
    setIsEditingProfile(false);
  };

  const user = {
    name: `${profile.firstName} ${profile.name}`,
    role: 'Enseignant',
    notifications: 3,
  };

  const { courses, students } = enseignantData;
  const nextCourse = (enseignantData.profile as { nextCourse?: { subject: string; time: string; room: string } }).nextCourse;

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen lg:ml-72">
        <Navbar user={user} onToggleSidebar={handleToggleSidebar} onLogout={handleLogout} />

        <main className="p-6 bg-slate-50 flex-1">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Bonjour, {profile.firstName} {profile.name}
            </h1>
            <p className="text-slate-600 mb-6">Voici un aperçu de votre activité.</p>

            {/* Section Profil éditable */}
            <Card className="p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Mon Profil</h2>
                  <p className="text-sm text-slate-500">Modifiez vos informations personnelles</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                <FormField label="Prénom" name="firstName" value={profile.firstName} onChange={handleProfileChange} />
                <FormField label="Nom" name="name" value={profile.name} onChange={handleProfileChange} />
                <FormField label="Email" name="email" type="email" value={profile.email} onChange={handleProfileChange} />
                <FormField label="Téléphone" name="phone" value={profile.phone} onChange={handleProfileChange} />
                <FormField label="Matières" name="matiere" value={profile.matiere} onChange={handleProfileChange} placeholder="Ex: Mathématiques, Algorithmique" />
              </div>
              <Button onClick={handleSaveProfile} className="mt-4 bg-blue-600 text-white hover:bg-blue-700">
                Sauvegarder le profil
              </Button>
            </Card>

            <h2 className="text-lg font-semibold text-slate-800 mb-4">Accès rapide</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Link href="/enseignant/cours">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Mes Cours</p>
                      <p className="text-3xl font-bold text-blue-600">{courses.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                    Voir les cours <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link href="/enseignant/etudiants">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Mes Étudiants</p>
                      <p className="text-3xl font-bold text-emerald-600">{students.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-emerald-600 text-sm font-medium">
                    Voir les étudiants <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link href="/enseignant/emploi-du-temps">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Emploi du temps</p>
                      <p className="text-lg font-bold text-amber-600">Voir</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-amber-600 text-sm font-medium">
                    Consulter <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>
            </div>

            {nextCourse && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Prochain cours</h2>
                <div className="flex items-center justify-between bg-blue-50 rounded-lg p-4">
                  <div>
                    <p className="font-medium text-slate-800">{nextCourse.subject}</p>
                    <p className="text-sm text-slate-600 mt-1">
                      {nextCourse.time} — {nextCourse.room}
                    </p>
                  </div>
                  <Link
                    href="/enseignant/emploi-du-temps"
                    className="text-blue-600 font-medium text-sm flex items-center"
                  >
                    Voir l&apos;emploi du temps <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
