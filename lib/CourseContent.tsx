// components/enseignant/CourseContent.tsx
import React, { useState } from 'react';
import { Card } from '../common/card';
import { Button } from '@base-ui/react'; 
interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'pdf' | 'quiz' | 'assignment';
  completed?: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

const CourseContent: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Introduction à React',
      lessons: [
        { id: '1-1', title: 'Qu\'est-ce que React ?', duration: '15 min', type: 'video' },
        { id: '1-2', title: 'Configuration de l\'environnement', duration: '20 min', type: 'video' },
        { id: '1-3', title: 'Quiz d\'introduction', duration: '10 min', type: 'quiz' },
      ]
    },
    {
      id: '2',
      title: 'Les composants React',
      lessons: [
        { id: '2-1', title: 'Créer son premier composant', duration: '25 min', type: 'video' },
        { id: '2-2', title: 'Props et State', duration: '30 min', type: 'video' },
        { id: '2-3', title: 'Exercice pratique', duration: '45 min', type: 'assignment' },
      ]
    }
  ]);

  const [expandedModule, setExpandedModule] = useState<string | null>('1');

  const getTypeIcon = (type: string): string => {
    const icons = {
      video: '🎥',
      pdf: '📄',
      quiz: '❓',
      assignment: '📝'
    };
    return icons[type as keyof typeof icons] || '📁';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Contenu du cours</h1>
        <Button >+ Ajouter un module</Button>
      </div>

      {/* Aperçu du cours */}
      <Card>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center text-4xl">
            📘
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">React pour débutants</h2>
            <p className="text-gray-500">12 leçons • 4h30 de contenu</p>
          </div>
          <Button >Aperçu</Button>
        </div>
      </Card>

      {/* Structure du cours */}
      <Card title="Structure du cours" >
        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="border rounded-lg overflow-hidden">
              {/* En-tête du module */}
              <button
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📂</span>
                  <div className="text-left">
                    <h3 className="font-semibold">{module.title}</h3>
                    <p className="text-sm text-gray-500">
                      {module.lessons.length} leçons
                    </p>
                  </div>
                </div>
                <span className="text-xl">
                  {expandedModule === module.id ? '▼' : '▶'}
                </span>
              </button>

              {/* Leçons du module */}
              {expandedModule === module.id && (
                <div className="p-4 space-y-3">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{getTypeIcon(lesson.type)}</span>
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-gray-500">{lesson.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          ✏️
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          🗑️
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          ⚡
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Bouton ajouter une leçon */}
                  <button className="w-full mt-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
                    + Ajouter une leçon
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Statistiques du cours */}
      <Card title="Statistiques du cours" >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">45</p>
            <p className="text-sm text-gray-500">Étudiants</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">78%</p>
            <p className="text-sm text-gray-500">Taux de complétion</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">4.7</p>
            <p className="text-sm text-gray-500">Note moyenne</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">23</p>
            <p className="text-sm text-gray-500">Devoirs rendus</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CourseContent;