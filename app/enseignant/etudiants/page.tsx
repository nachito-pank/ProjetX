'use client';

import React, { useState } from 'react';
import { Layout } from '@/components1/common/Layout';
import { DataTable } from '@/components1/common/DataTable';
import { Card } from '@/components1/common/Card';
import { FormField } from '@/components1/common/FormField';
import { Badge } from '@/components1/common/Badge';
import { GraduationCap, Search, ArrowUpDown } from 'lucide-react';
import enseignantData from '@/data/enseignant.json';

export default function StudentList() {
  const [selectedFiliere, setSelectedFiliere] = useState('Informatique');
  const [selectedLevel, setSelectedLevel] = useState('L1');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const uniqueFilieres = React.useMemo(() => {
    const filieres = [...new Set(enseignantData.students.map(s => s.filiere))];
    return filieres.map(f => ({ label: f, value: f }));
  }, []);

  const uniqueLevels = React.useMemo(() => {
    const levels = [...new Set(enseignantData.students.map(s => s.level))];
    return levels.map(l => ({ label: l, value: l }));
  }, []);

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const filteredStudents = React.useMemo(() => {
    return enseignantData.students.filter(student => 
      student.filiere === selectedFiliere && 
      student.level === selectedLevel &&
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [selectedFiliere, selectedLevel, searchTerm]);

  const sortedStudents = React.useMemo(() => {
    if (!sortOrder) return filteredStudents;
    return [...filteredStudents].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === 'asc') return nameA.localeCompare(nameB);
      return nameB.localeCompare(nameA);
    });
  }, [sortOrder, filteredStudents]);

  const columns = [
    { header: 'ID', accessor: (item: any) => <span className="font-bold text-slate-400">#{item.id}</span> },
    { header: 'Nom', accessor: (item: any) => <span className="font-bold text-slate-800">{item.name}</span> },
    { header: 'Prénom', accessor: (item: any) => item.firstName },
    { header: 'Email', accessor: (item: any) => item.email },
    { header: 'Statut', accessor: () => <Badge variant="success">Inscrit</Badge> },
  ];

  return (
    <Layout
      role="enseignant"
      user={{ name: 'Jean Dupont', role: 'Enseignant', notifications: 2 }}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Mes Étudiants</h2>
            <p className="text-slate-500 font-medium">Consultez la liste des étudiants par filière et niveau</p>
          </div>
          <div className="w-12 h-12 bg-enseignant/10 rounded-2xl flex items-center justify-center text-enseignant">
            <GraduationCap className="w-8 h-8" />
          </div>
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
          </div>
        </Card>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Liste des étudiants ({filteredStudents.length})</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSort}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowUpDown className="w-4 h-4" />
                Tri {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
              </button>
              <Badge variant="secondary" className="font-bold">{selectedFiliere} - {selectedLevel}</Badge>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={sortedStudents}
            emptyMessage="Aucun étudiant trouvé pour ces critères"
          />
        </div>
      </div>
    </Layout>
  );
}
