'use client';

import React, { useState } from 'react';
import { Layout } from '@/components1/common/Layout';
import { Button } from '@/components1/common/Button';
import { Badge } from '@/components1/common/Badge';
import { ChevronLeft, ChevronRight, MapPin, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import enseignantData from '@/data/enseignant.json';

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const HOURS = Array.from({ length: 13 }, (_, i) => `${i + 8}:00`);

const timetable = enseignantData.timetable || [];

export default function TeacherTimetable() {
  const teacherName = `${enseignantData.profile.firstName} ${enseignantData.profile.name}`;

  const getEntryAt = (day: string, hour: string) => {
    return timetable.find(
      (e: { day: string; startTime: string; teacher: string }) =>
        e.day === day && e.startTime === hour && e.teacher === teacherName
    );
  };

  // --- Gestion de la semaine dynamique ---
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));

  function getStartOfWeek(date: Date) {
    const day = date.getDay(); // 0 = dimanche, 1 = lundi ...
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // ajuster pour lundi
    return new Date(date.setDate(diff));
  }

  const formatWeekRange = (start: Date) => {
    const end = new Date(start);
    end.setDate(start.getDate() + 5); // samedi
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return `${start.toLocaleDateString('fr-FR', options)} - ${end.toLocaleDateString('fr-FR', options)}`;
  };

  const prevWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newStart);
  };

  const nextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newStart);
  };

  return (
    <Layout
      role="enseignant"
      user={{ name: teacherName, role: 'Enseignant', notifications: 2 }}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Mon Emploi du Temps</h2>
            <p className="text-slate-500 font-medium">Consultez votre planning hebdomadaire</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" icon={<ChevronLeft className="w-4 h-4" />} onClick={prevWeek} />
            <Button variant="outline" className="font-bold">{formatWeekRange(currentWeekStart)}</Button>
            <Button variant="outline" size="icon" icon={<ChevronRight className="w-4 h-4" />} onClick={nextWeek} />
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header des jours */}
              <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
                <div className="p-4 border-r border-slate-100" /> {/* Coin vide */}
                {DAYS.map((day, idx) => (
                  <div key={day} className="p-4 text-center border-r border-slate-100 last:border-r-0">
                    <span className="text-sm font-black text-slate-800 uppercase tracking-widest">
                      {day} <br />
                      {new Date(currentWeekStart.getTime() + idx * 24 * 60 * 60 * 1000).getDate()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Corps du tableau */}
              <div className="relative">
                {HOURS.map((hour) => (
                  <div key={hour} className="grid grid-cols-7 border-b border-slate-50 last:border-b-0 group">
                    {/* Colonne des heures */}
                    <div className="p-4 border-r border-slate-100 flex items-center justify-center bg-slate-50/30">
                      <span className="text-xs font-bold text-slate-400">{hour}</span>
                    </div>

                    {/* Cellules pour chaque jour */}
                    {DAYS.map((day) => {
                      const entry = getEntryAt(day, hour);
                      return (
                        <div
                          key={`${day}-${hour}`}
                          className="p-2 border border-slate-200 min-h-[100px] relative group-hover:bg-slate-50/20 transition-colors flex flex-col justify-start"
                        >
                          {entry ? (
                            <div
                              className={cn(
                                "h-full rounded-xl p-3 border shadow-sm transition-all hover:scale-[1.02] cursor-pointer",
                                "bg-blue-50 border-blue-200 text-blue-700"
                              )}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <Badge
                                  variant="secondary"
                                  className="text-[8px] px-1.5 py-0 bg-blue-100 text-blue-700 border-blue-200"
                                >
                                  {entry.type}
                                </Badge>
                                <span className="text-[10px] font-bold opacity-60">
                                  {entry.startTime} - {entry.endTime}
                                </span>
                              </div>
                              <h5 className="text-xs font-black truncate">{entry.subject}</h5>
                              <div className="mt-2 space-y-1">
                                <div className="flex items-center gap-1 opacity-70">
                                  <GraduationCap className="w-3 h-3" />
                                  <span className="text-[9px] font-bold truncate">
                                    {entry.filiere} {entry.level}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 opacity-70">
                                  <MapPin className="w-3 h-3" />
                                  <span className="text-[9px] font-bold">{entry.room}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            // Cellule vide : juste un petit repère de la grille
                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px]">
                              {hour}
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