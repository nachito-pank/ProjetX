'use client';

import React, { useState } from 'react';
import Sidebar from '@/components1/common/Sidebar';
import Navbar from '@/components1/common/Navbar';
import { Card } from '@/components1/common/Card';
import { Button } from '@/components1/common/Button';
import FormField from '@/components1/common/FormField';
import { BookOpen, GraduationCap, Calendar, ChevronRight, User, Mail, Phone, BookOpenText, Pencil, Camera, X } from 'lucide-react';
import Link from 'next/link';
import enseignantData from '@/data/enseignant.json';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
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
    setProfileImage(null);
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
        <Navbar user={{ ...user, avatarUrl: profileImage }} onToggleSidebar={handleToggleSidebar} onLogout={handleLogout} />

        <main className="p-6 bg-slate-50 flex-1">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              Bonjour, {profile.firstName} {profile.name}
            </h1>
            <p className="text-slate-600 mb-6">Voici un aperçu de votre activité.</p>

            {/* Section Profil - Design professionnel */}
            <div className="mb-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />
              <div className="relative px-6 pb-6 -mt-16">
                <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                  {/* Photo - Style carte professionnelle */}
                  <div className="relative shrink-0">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                      {profileImage ? (
                        <img src={profileImage} alt="Photo" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                          <User className="w-14 h-14 text-white/90" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 min-w-0 pt-2 sm:pt-0">
                    {!isEditingProfile ? (
                      <>
                        <div className="space-y-4">
                          <div>
                            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                              {profile.firstName} {profile.name}
                            </h2>
                            <span className="inline-block mt-1 px-3 py-0.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                              Enseignant
                            </span>
                          </div>
                          <div className="space-y-2.5 pt-2">
                            <div className="flex items-center gap-3 text-slate-600">
                              <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                <Mail className="w-4 h-4 text-slate-500" />
                              </div>
                              <span className="text-sm font-medium">{profile.email}</span>
                            </div>
                            {profile.phone && (
                              <div className="flex items-center gap-3 text-slate-600">
                                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                  <Phone className="w-4 h-4 text-slate-500" />
                                </div>
                                <span className="text-sm font-medium">{profile.phone}</span>
                              </div>
                            )}
                            {profile.matiere && (
                              <div className="flex items-center gap-3 text-slate-600">
                                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                  <BookOpenText className="w-4 h-4 text-slate-500" />
                                </div>
                                <span className="text-sm font-medium">{profile.matiere}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={() => setIsEditingProfile(true)}
                          variant="outline"
                          className="mt-6 w-fit flex items-center gap-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"
                        >
                          <Pencil className="w-4 h-4" />
                          Modifier le profil
                        </Button>
                      </>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Pencil className="w-4 h-4 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-slate-800">Modifier mon profil</h3>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start gap-6">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
                              {profileImage ? (
                                <div className="relative w-full h-full">
                                  <img src={profileImage} alt="Aperçu" className="w-full h-full object-cover" />
                                  <button type="button" onClick={(e) => { e.preventDefault(); removeProfileImage(); }} className="absolute top-0 right-0 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-bl-lg" title="Supprimer">
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <User className="w-10 h-10 text-slate-400" />
                              )}
                            </div>
                            <label className="cursor-pointer">
                              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700">
                                <Camera className="w-4 h-4" />
                                Photo
                              </span>
                            </label>
                          </div>

                          <div className="flex-1 grid gap-4 sm:grid-cols-2 w-full">
                            <FormField label="Prénom" name="firstName" value={profile.firstName} onChange={handleProfileChange} />
                            <FormField label="Nom" name="name" value={profile.name} onChange={handleProfileChange} />
                            <FormField label="Email" name="email" type="email" value={profile.email} onChange={handleProfileChange} />
                            <FormField label="Téléphone" name="phone" value={profile.phone} onChange={handleProfileChange} />
                            <div className="sm:col-span-2">
                              <FormField label="Matières" name="matiere" value={profile.matiere} onChange={handleProfileChange} placeholder="Ex: Mathématiques, Algorithmique" />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={handleSaveProfile} className="bg-blue-600 text-white hover:bg-blue-700">Enregistrer</Button>
                          <Button onClick={handleCancelEdit} variant="outline">Annuler</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

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
