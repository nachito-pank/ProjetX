'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { FormField } from '@/components/common/FormField';
import { Badge } from '@/components/common/Badge';
import { User, Mail, Lock, Save, BookOpen, GraduationCap, Clock, MapPin, Edit } from 'lucide-react';
import { useToast } from '@/components/common/Toast';
import enseignantData from '@/data/enseignant.json';

export default function TeacherProfile() {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Profil mis à jour', 'success');
    }, 1000);
  };

  return (
    <Layout
      role="enseignant"
      user={{ name: 'Jean Dupont', role: 'Enseignant', notifications: 2 }}
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 space-y-6">
            <Card className="text-center p-8" accentColor="enseignant">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg mx-auto mb-4 overflow-hidden">
                <User className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">{enseignantData.profile.firstName} {enseignantData.profile.name}</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Enseignant</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {enseignantData.profile.subjects.map((sub) => (
                  <Badge key={sub} variant="primary">{sub}</Badge>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-black text-slate-800 leading-none">{enseignantData.profile.coursesCount}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Cours</p>
              </Card>
              <Card className="p-4 text-center">
                <GraduationCap className="w-6 h-6 text-enseignant mx-auto mb-2" />
                <p className="text-2xl font-black text-slate-800 leading-none">{enseignantData.profile.studentsCount}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Étudiants</p>
              </Card>
            </div>

            <Card title="Prochain cours" accentColor="primary">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{enseignantData.profile.nextCourse.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{enseignantData.profile.nextCourse.room}</span>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs font-black text-slate-800 uppercase tracking-widest">{enseignantData.profile.nextCourse.subject}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex-1 space-y-8">
            <Card title="Modifier le profil" icon={<Edit className="w-5 h-5" />} accentColor="enseignant">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Nom" defaultValue={enseignantData.profile.name} required />
                  <FormField label="Prénom" defaultValue={enseignantData.profile.firstName} required />
                </div>
                <FormField label="Email" type="email" defaultValue={enseignantData.profile.email} required icon={<Mail className="w-4 h-4" />} />
                
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Sécurité
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField label="Nouveau mot de passe" type="password" placeholder="••••••••" />
                    <FormField label="Confirmation" type="password" placeholder="••••••••" />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" loading={loading} icon={<Save className="w-4 h-4" />}>
                    Enregistrer les modifications
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
