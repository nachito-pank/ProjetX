// components/enseignant/TeacherDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../common/card';
import StatsCard  from '../common/StatsCard'
import { TeacherStats, TeacherCourse } from './types/enseignant.types';

const TeacherDashboard: React.FC = () => {
  const [stats, setStats] = useState<TeacherStats>({
    totalCourses: 0,
    totalStudents: 0,
    pendingGrading: 0,
    averageRating: 0
  });

  const [recentCourses, setRecentCourses] = useState<TeacherCourse[]>([
    {
      id: '1',
      title: 'React pour débutants',
      description: 'Apprenez React pas à pas',
      category: 'Développement Web',
      level: 'Débutant',
      price: 50000,
      students: 45,
      progress: 75,
      status: 'publié',
      lastUpdated: new Date()
    },
    {
      id: '2',
      title: 'TypeScript avancé',
      description: 'Maîtrisez TypeScript',
      category: 'Développement Web',
      level: 'Avancé',
      price: 65000,
      students: 32,
      progress: 60,
      status: 'publié',
      lastUpdated: new Date()
    }
  ]);

  useEffect(() => {
    // Simuler le chargement des stats
    setStats({
      totalCourses: 5,
      totalStudents: 187,
      pendingGrading: 23,
      averageRating: 4.7
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard Enseignant 👨‍🏫
        </h1>
        <p className="text-gray-500 mt-1">Bienvenue sur votre espace enseignant</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Mes cours" 
          value={stats.totalCourses} 
          icon="📚" 
        />
        <StatsCard 
          title="Étudiants" 
          value={stats.totalStudents} 
          icon="👥" 
          trend={+15}
        />
        <StatsCard 
          title="À corriger" 
          value={stats.pendingGrading} 
          icon="📝" 
          trend={-5}
        />
        <StatsCard 
          title="Note moyenne" 
          value={stats.averageRating} 
          icon="⭐" 
        />
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cours récents */}
        <Card title="Mes cours récents"  className="lg:col-span-2">
          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{course.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      course.status === 'publié' ? 'bg-green-100 text-green-800' :
                      course.status === 'en-attente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>👥 {course.students} étudiants</span>
                    <span>📊 {course.progress}% complété</span>
                    <span>💰 {course.price.toLocaleString()} FCFA</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tâches récentes */}
        <Card title="Tâches récentes">
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="font-medium">23 devoirs à corriger</p>
              <p className="text-sm text-gray-500">Date limite: demain</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium">5 nouveaux messages</p>
              <p className="text-sm text-gray-500">De vos étudiants</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-medium">Cours à mettre à jour</p>
              <p className="text-sm text-gray-500">React - nouvelle version</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;