'use client';

import React, { useState } from 'react';
import { Layout } from '@/components1/common/Layout';
import { DataTable } from '@/components1/common/DataTable';
import { Button } from '@/components1/common/Button';
import { Modal } from '@/components1/common/Modal';
import FormField from '@/components1/common/FormField';
import { Badge } from '@/components1/common/Badge';
import { Card } from '@/components1/common/Card';
import { Plus, Edit, File, Trash2, BookOpenText, Eye, Download, Search } from 'lucide-react';
import { useToast } from '@/components1/common/Toast';
import enseignantData from '@/data/enseignant.json';

interface Course {
  id: number;
  title: string;
  filiere: string;
  level: string;
  volume: string;
  url: string;
  fileName?: string;
}

export default function ManageCourses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>(enseignantData.courses);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [selectedFiliere, setSelectedFiliere] = useState<string>('Informatique');
  const [selectedLevel, setSelectedLevel] = useState<string>('L1');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { showToast } = useToast();

  const uniqueFilieres = React.useMemo(() => {
    const filieres = [...new Set(courses.map(c => c.filiere))];
    return filieres.map(f => ({ label: f, value: f }));
  }, [courses]);

  const uniqueLevels = React.useMemo(() => {
    const levels = [...new Set(courses.map(c => c.level))];
    return levels.map(l => ({ label: l, value: l }));
  }, [courses]);

  const filteredCourses = React.useMemo(() => {
    return courses.filter(course => 
      course.filiere === selectedFiliere && 
      course.level === selectedLevel &&
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, selectedFiliere, selectedLevel, searchTerm]);

  const columns = [
    { header: 'Intitulé du cours', accessor: (item: any) => <span className="font-bold text-slate-800">{item.title}</span> },
    { header: 'Filière', accessor: (item: any) => <Badge variant="primary">{item.filiere}</Badge> },
    { header: 'Niveau', accessor: (item: any) => item.level },
    { header: 'Fichier', accessor: (item: any) => item.url ? <a href={item.url} target="_blank" className="text-primary underline flex items-center gap-1"><Eye className="w-4 h-4" /> Voir fichier</a> : <span className="text-slate-400">Aucun</span> },
    { header: 'Volume', accessor: (item: any) => <span className="font-bold text-slate-600">{item.volume}</span> }
  ];

  const handleAdd = () => {
    setSelectedCourse(null);
    setFile(null);
    setIsModalOpen(true); 
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setFile(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile?.name || '');
  };

  const handleView = (course: Course) => {
    if (course.url) {
      window.open(course.url, '_blank');
    }
  };

  const handleDownload = (course: Course) => {
    if (course.url) {
      const a = document.createElement('a');
      a.href = course.url;
      a.download = course.fileName || 'fichier';
      a.click();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let url = selectedCourse?.url || '';
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        url = reader.result as string;
        saveCourse(url);
      };
      reader.readAsDataURL(file);
    } else {
      saveCourse(url);
    }
  };

  const saveCourse = (url: string) => {
    if (selectedCourse) {
      // Edit existing
      setCourses(courses.map(c => c.id === selectedCourse.id ? { ...c, url, fileName: fileName || c.fileName } : c));
      showToast('Cours modifié', 'success');
    } else {
      // Add new
      const newCourse: Course = {
        id: Math.max(...courses.map(c => c.id)) + 1,
        title: (document.getElementById('title') as HTMLInputElement)?.value || '',
        filiere: (document.getElementById('filiere') as HTMLSelectElement)?.value || '',
        level: (document.getElementById('level') as HTMLSelectElement)?.value || '',
        volume: (document.getElementById('volume') as HTMLInputElement)?.value || '',
        url,
        fileName
      };
      setCourses([...courses, newCourse]);
      showToast('Cours ajouté', 'success');
    }
    setFile(null);
    setIsModalOpen(false);
  };

  return (
    <Layout
      role="enseignant"
      user={{ name: 'Jean Dupont', role: 'Enseignant', notifications: 2 }}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Mes Cours</h2>
            <p className="text-slate-500 font-medium">Gérez les cours que vous dispensez cette année</p>
          </div>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
            Ajouter un cours
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
            <div className="flex items-end">
              <div className="w-full relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher un cours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                />
              </div>
            </div>
          </div>
        </Card>
        <div className="bg-white p-6 rounded-2xl bg-y shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Liste des cours ({filteredCourses.length})</h3>
            <Badge variant="secondary" className="font-bold">{selectedFiliere} - {selectedLevel}</Badge>
          </div>
          <DataTable
            columns={columns}
            data={filteredCourses}
            actions={(item: Course) => (
              <div className="flex items-center  justify-end gap-2">
                {item.url && <Button variant="ghost" size="icon" onClick={() => handleView(item)} icon={<Eye className="w-4 h-4 text-blue-500" />} />}
                {item.url && <Button variant="ghost" size="icon" onClick={() => handleDownload(item)} icon={<Download className="w-4 h-4 text-green-500" />} />}
                <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} icon={<Edit className="w-4 h-4 text-slate-400" />} />
                <Button variant="ghost" size="icon" className="text-danger/60" icon={<Trash2 className="w-4 h-4" />} />
              </div>
            )}
          />
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedCourse ? 'Modifier Cours' : 'Ajouter un Cours'}
          footer={
            <>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Annuler</Button>
              <Button variant="primary" onClick={handleSave}>Enregistrer</Button>
            </>
          }
        >
          <form className="space-y-6">
            <FormField id="title" label="Intitulé du cours" defaultValue={selectedCourse?.title} required placeholder="ex: Nom du cours" />
            <div className="grid grid-cols-2 gap-4">
              <FormField id="filiere" label="Filière" as="select" defaultValue={selectedCourse?.filiere} options={uniqueFilieres} required />
              <FormField id="level" label="Niveau" as="select" defaultValue={selectedCourse?.level} options={uniqueLevels} required />
            </div>
            <FormField type="file" label="Fichier du cours" onChange={handleFileChange} accept=".pdf,.doc,.docx,.ppt,.pptx" icon={<File className="w-4 h-4"/>} />
            <FormField id="volume" label="Volume de pages" defaultValue={selectedCourse?.volume} placeholder="ex: 19 pages" required icon={<BookOpenText className="w-4 h-4" />} />
          </form>
        </Modal>
      </div>
    </Layout>
  );
}
