'use client';

import React, { useState } from 'react';
import Sidebar from '@/components1/common/Sidebar';
import Navbar from '@/components1/common/Navbar';
import { Card } from '@/components1/common/Card';
import { BookOpen, GraduationCap, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import enseignantData from '@/data/enseignant.json';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => {
    console.log('Déconnexion');
  };

  const { profile, courses, students } = enseignantData;
  const user = {
    name: `${profile.firstName} ${profile.name}`,
    role: 'Enseignant',
    notifications: 3,
  };

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
            <p className="text-slate-600 mb-8">Voici un aperçu de votre activité.</p>

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

            {profile.nextCourse && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Prochain cours</h2>
                <div className="flex items-center justify-between bg-blue-50 rounded-lg p-4">
                  <div>
                    <p className="font-medium text-slate-800">{profile.nextCourse.subject}</p>
                    <p className="text-sm text-slate-600 mt-1">
                      {profile.nextCourse.time} — {profile.nextCourse.room}
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
