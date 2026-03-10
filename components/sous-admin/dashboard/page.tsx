import React, { useState, useEffect } from 'react';
import { Card } from '../common/card';
import StatsCard from '../common/StatsCard'
import { SousAdminStats } from './types/sous-admin.types';

const SousAdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<SousAdminStats>({
    totalCourses: 0,
    totalStudents: 0,
    activeCourses: 0,
    pendingApprovals: 0,
    revenue: 0
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'Nouveau cours ajouté', details: 'React Avancé', time: 'Il y a 2h' },
    { id: 2, action: 'Inscription', details: '15 nouveaux étudiants', time: 'Il y a 5h' },
    { id: 3, action: 'Approbation en attente', details: '3 cours à valider', time: 'Il y a 1j' },
  ]);

  useEffect(() => {
    // Simuler le chargement des données
    setStats({
      totalCourses: 48,
      totalStudents: 1250,
      activeCourses: 32,
      pendingApprovals: 7,
      revenue: 12500000
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Dashboard Sous-Admin 🔰
          </h1>
          <p className="text-gray-500 mt-1">Gérez les cours et les étudiants</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg">
          <span className="font-semibold">{stats.pendingApprovals}</span> approbations en attente
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Cours total" 
          value={stats.totalCourses} 
          icon="📚" 
          trend={+8}
        />
        <StatsCard 
          title="Étudiants" 
          value={stats.totalStudents} 
          icon="👥" 
          trend={+12}
        />
        <StatsCard 
          title="Cours actifs" 
          value={stats.activeCourses} 
          icon="✅" 
          trend={+5}
        />
        <StatsCard 
          title="Revenus" 
          value={`${(stats.revenue / 1000000).toFixed(1)}M FCFA`} 
          icon="💰" 
          trend={+15}
        />
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cours récents */}
        <Card title="Cours récents" className="lg:col-span-2">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📘</span>
                  <div>
                    <p className="font-medium">Introduction à TypeScript</p>
                    <p className="text-sm text-gray-500">Par Jean Dupont</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Il y a 2 jours</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Activités récentes */}
        <Card title="Activités récentes" >
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="border-b last:border-0 pb-3 last:pb-0">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.details}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Approuvations en attente */}
      <Card title="Cours en attente d'approbation" >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left">Cours</th>
                <th className="px-4 py-3 text-left">Enseignant</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-3">React Native Avancé</td>
                  <td className="px-4 py-3">Marie Claire</td>
                  <td className="px-4 py-3">2024-01-15</td>
                  <td className="px-4 py-3">
                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm mr-2">
                      Approuver
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
                      Rejeter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default SousAdminDashboard;