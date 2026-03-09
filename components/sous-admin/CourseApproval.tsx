import React, { useState } from 'react';
import { Card } from '../common/card';
import { Button } from '../common/button'

interface PendingCourse {
  id: string;
  title: string;
  instructor: string;
  category: string;
  submittedDate: string;
  description: string;
  price: number;
}

const CourseApproval: React.FC = () => {
  const [pendingCourses, setPendingCourses] = useState<PendingCourse[]>([
    {
      id: '1',
      title: 'React Native pour débutants',
      instructor: 'Marie Claire',
      category: 'Développement mobile',
      submittedDate: '2024-01-15',
      description: 'Apprenez à créer des applications mobiles avec React Native',
      price: 75000
    },
    {
      id: '2',
      title: 'Python pour la Data Science',
      instructor: 'Pierre Paul',
      category: 'Data Science',
      submittedDate: '2024-01-14',
      description: 'Maîtrisez Python et ses librairies pour l\'analyse de données',
      price: 85000
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState<PendingCourse | null>(null);

  const handleApprove = (courseId: string): void => {
    setPendingCourses(pendingCourses.filter(c => c.id !== courseId));
    setSelectedCourse(null);
    alert('Cours approuvé avec succès !');
  };

  const handleReject = (courseId: string): void => {
    setPendingCourses(pendingCourses.filter(c => c.id !== courseId));
    setSelectedCourse(null);
    alert('Cours rejeté.');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Approbation des cours</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des cours en attente */}
        <div className="lg:col-span-1">
          <Card title="Cours en attente" >
            <div className="space-y-3">
              {pendingCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCourse?.id === course.id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <p className="font-medium">{course.title}</p>
                  <p className="text-sm text-gray-500">{course.instructor}</p>
                  <p className="text-xs text-gray-400 mt-1">{course.submittedDate}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Détails du cours sélectionné */}
        <div className="lg:col-span-2">
          {selectedCourse ? (
            <Card>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                    <p className="text-gray-600">Par {selectedCourse.instructor}</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    En attente
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Catégorie</p>
                    <p className="font-medium">{selectedCourse.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prix</p>
                    <p className="font-medium">{selectedCourse.price.toLocaleString()} FCFA</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Soumis le</p>
                    <p className="font-medium">{selectedCourse.submittedDate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="text-gray-700">{selectedCourse.description}</p>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button 
                    onClick={() => handleApprove(selectedCourse.id)}
                  >
                    ✅ Approuver le cours
                  </Button>
                  <Button 
                    onClick={() => handleReject(selectedCourse.id)}
                  >
                    ❌ Rejeter
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">👆</span>
                <h3 className="text-xl font-semibold text-gray-500">
                  Sélectionnez un cours à examiner
                </h3>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseApproval;