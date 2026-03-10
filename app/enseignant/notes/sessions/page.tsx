'use client';

import React, { useState } from 'react';
import { Layout } from '@/components1/common/Layout';
import { Card } from '@/components1/common/Card';
import { Button } from '@/components1/common/Button';
import { FormField } from '@/components1/common/FormField';
import { Badge } from '@/components1/common/Badge';
import { FileText, Save, Calculator, User, AlertCircle, Search } from 'lucide-react';
import { useToast } from '@/components1/common/Toast';
import { cn } from '@/lib/utils';
import enseignantData from '@/data/enseignant.json';

export default function GradeSessions() {
  const [grades, setGrades] = useState(enseignantData.grades);
  const [loading, setLoading] = useState(false);
  const [selectedFiliere, setSelectedFiliere] = useState('Informatique');
  const [selectedLevel, setSelectedLevel] = useState('L1');
  const [selectedCourse, setSelectedCourse] = useState('Algèbre Linéaire');
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToast();

  const uniqueFilieres = React.useMemo(() => {
    const filieres = [...new Set(enseignantData.students.map(s => s.filiere))];
    return filieres.map(f => ({ label: f, value: f }));
  }, []);

  const uniqueLevels = React.useMemo(() => {
    const levels = [...new Set(enseignantData.students.map(s => s.level))];
    return levels.map(l => ({ label: l, value: l }));
  }, []);

  const uniqueCourses = React.useMemo(() => {
    const courses = [...new Set(enseignantData.courses.map(c => c.title))];
    return courses.map(c => ({ label: c, value: c }));
  }, []);

  const filteredCourses = React.useMemo(() => {
    return enseignantData.courses.filter(c => c.filiere === selectedFiliere && c.level === selectedLevel).map(c => ({ label: c.title, value: c.title }));
  }, [selectedFiliere, selectedLevel]);

  const getAppreciation = (grade: number) => {
    if (grade >= 16) return 'Excellent';
    if (grade >= 14) return 'Très bien';
    if (grade >= 12) return 'Bien';
    if (grade >= 10) return 'Assez bien';
    return 'Insuffisant';
  };

  const filteredStudents = React.useMemo(() => {
    return enseignantData.students.filter(student => 
      student.filiere === selectedFiliere && 
      student.level === selectedLevel &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedFiliere, selectedLevel, searchTerm]);

  const getStudentGradeSession = (studentId: string) => {
    const gradeEntry = grades.find(g => g.studentId === studentId);
    return gradeEntry ? gradeEntry.gradeSession : 0;
  };

  const handleGradeChange = (studentId: string, value: string) => {
    const cleanedValue = value.replace(',', '.');
    const numValue = parseFloat(cleanedValue);
    if (isNaN(numValue) || numValue < 0 || numValue > 20) return;
    
    const student = enseignantData.students.find(s => s.id === studentId);
    if (!student) return;
    
    setGrades(prev => {
      const existingGradeIndex = prev.findIndex(g => g.studentId === studentId);
      if (existingGradeIndex >= 0) {
        // Mettre à jour la note existante
        const updated = [...prev];
        updated[existingGradeIndex] = { ...updated[existingGradeIndex], gradeSession: numValue };
        return updated;
      } else {
        // Ajouter une nouvelle note
        return [...prev, {
          studentId,
          studentName: `${student.firstName} ${student.name}`,
          grade: 0,
          gradeSession: numValue
        }];
      }
    });
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Notes de session enregistrées', 'success');
    }, 1000);
  };

  const average = filteredStudents.reduce((acc, student) => acc + getStudentGradeSession(student.id), 0) / filteredStudents.length;

  return (
    <Layout
      role="enseignant"
      user={{ name: 'Jean Dupont', role: 'Enseignant', notifications: 2 }}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Notes Sessions</h2>
            <p className="text-slate-500 font-medium">Saisissez les notes d&apos;examens de session</p>
          </div>
          <Button variant="primary" icon={<Save className="w-4 h-4" />} loading={loading} onClick={handleSave}>
            Enregistrer tout
          </Button>
        </div>

        <Card className="p-4 bg-slate-50 border-dashed">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField 
              label="Filière" 
              as="select" 
              value={selectedFiliere}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedFiliere(e.target.value)}
              options={uniqueFilieres} 
            />
            <FormField 
              label="Niveau" 
              as="select" 
              value={selectedLevel}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedLevel(e.target.value)}
              options={uniqueLevels} 
            />
            <FormField 
              label="Cours" 
              as="select" 
              value={selectedCourse}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCourse(e.target.value)}
              options={filteredCourses} 
            />
          </div>
        </Card>

        <Card className="p-4 bg-slate-50 border-dashed">
          <div className="flex items-end">
            <div className="w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un étudiant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
              />
            </div>
          </div>
        </Card>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-bold text-slate-600">Étudiant</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 w-32">Note / 20</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600">Appréciation</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600 text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-slate-800">{student.firstName} {student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          step="0.25"
                          value={getStudentGradeSession(student.id)}
                          onChange={(e) => handleGradeChange(student.id, e.target.value)}
                          placeholder="Note"
                          className={cn(
                            "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 font-bold text-slate-800",
                            getStudentGradeSession(student.id) < 10 ? "border-rose-200 focus:ring-rose-200 focus:border-rose-500" : "border-slate-200 focus:ring-primary/20 focus:border-primary"
                          )}
                        />
                        {getStudentGradeSession(student.id) < 10 && <div className="absolute -right-2 -top-2 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-white"><AlertCircle className="w-3 h-3" /></div>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg">
                        {getAppreciation(getStudentGradeSession(student.id))}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant={getStudentGradeSession(student.id) >= 10 ? 'success' : 'danger'}>
                        {getStudentGradeSession(student.id) >= 10 ? 'Validé' : 'Échec'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50/50 font-bold border-t border-slate-200">
                  <td className="px-6 py-4 text-sm text-slate-600">Moyenne de la classe</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Calculator className="w-4 h-4" />
                      <span className="text-lg font-black">{average.toFixed(2)}</span>
                    </div>
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
