'use client';

import React from 'react';
import { Layout } from '@/components1/common/Layout';
import { Card } from '@/components1/common/Card';
import { Button } from '@/components1/common/Button';
import { Badge } from '@/components1/common/Badge';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import sousAdminData from '@/data/sous-admin.json';

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const HOURS = Array.from({ length: 13 }, (_, i) => `${i + 8}:00`);

export default function TeacherTimetable() {
  const teacherName = 'Jean Dupont';

  const getEntryAt = (day: string, hour: string) => {
    return sousAdminData.timetable.find(
      (e) => e.day === day && e.startTime === hour && e.teacher === teacherName
    );
  };

  return (
    <Layout
      role="enseignant"
      user={{ name: 'Jean Dupont', role: 'Enseignant', notifications: 2 }}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Mon Emploi du Temps</h2>
            <p className="text-slate-500 font-medium">Consultez votre planning hebdomadaire</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" icon={<ChevronLeft className="w-4 h-4" />} />
            <Button variant="outline" className="font-bold">Semaine du 9 Mars</Button>
            <Button variant="outline" size="icon" icon={<ChevronRight className="w-4 h-4" />} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
                <div className="p-4 border-r border-slate-100" />
                {DAYS.map((day) => (
                  <div key={day} className="p-4 text-center border-r border-slate-100 last:border-r-0">
                    <span className="text-sm font-black text-slate-800 uppercase tracking-widest">{day}</span>
                  </div>
                ))}
              </div>

              <div className="relative">
                {HOURS.map((hour) => (
                  <div key={hour} className="grid grid-cols-7 border-b border-slate-50 last:border-b-0 group">
                    <div className="p-4 border-r border-slate-100 flex items-center justify-center bg-slate-50/30">
                      <span className="text-xs font-bold text-slate-400">{hour}</span>
                    </div>
                    {DAYS.map((day) => {
                      const entry = getEntryAt(day, hour);
                      return (
                        <div key={`${day}-${hour}`} className="p-2 border-r border-slate-50 last:border-r-0 min-h-[100px] relative group-hover:bg-slate-50/20 transition-colors">
                          {entry && (
                            <div className={cn(
                              "h-full rounded-xl p-3 border shadow-sm transition-all hover:scale-[1.02] cursor-pointer",
                              "bg-enseignant/5 border-enseignant/20 text-enseignant"
                            )}>
                              <div className="flex items-center justify-between mb-1">
                                <Badge variant="secondary" className="text-[8px] px-1.5 py-0 bg-enseignant/10 text-enseignant border-enseignant/20">
                                  {entry.type}
                                </Badge>
                                <span className="text-[10px] font-bold opacity-60">{entry.startTime} - {entry.endTime}</span>
                              </div>
                              <h5 className="text-xs font-black truncate">{entry.subject}</h5>
                              <div className="mt-2 space-y-1">
                                <div className="flex items-center gap-1 opacity-70">
                                  <GraduationCap className="w-3 h-3" />
                                  <span className="text-[9px] font-bold truncate">{entry.filiere} {entry.level}</span>
                                </div>
                                <div className="flex items-center gap-1 opacity-70">
                                  <MapPin className="w-3 h-3" />
                                  <span className="text-[9px] font-bold">{entry.room}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
