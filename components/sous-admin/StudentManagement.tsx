// components/sous-admin/StudentManagement.tsx
import React, { useState } from 'react';
import { Card } from '../common/card';
import { Button } from '@base-ui/react';
import { Student } from './types/sous-admin.types';

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@email.com',
      enrolledCourses: 5,
      completedCourses: 3,
      averageGrade: 85,
      status: 'actif',
      lastActive: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@email.com',
      enrolledCourses: 3,
      completedCourses: 2,
      averageGrade: 78,
      status: 'actif',
      lastActive: new Date('2024-01-14')
    },
    {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie@email.com',
      enrolledCourses: 4,
      completedCourses: 1,
      averageGrade: 92,
      status: 'inactif',
      lastActive: new Date('2024-01-10')
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des Étudiants</h1>

      {/* Barre de recherche */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button >Exporter la liste</Button>
        </div>
      </Card>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Total étudiants</p>
          <p className="text-2xl font-bold">{students.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Actifs</p>
          <p className="text-2xl font-bold">{students.filter(s => s.status === 'actif').length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600">Moyenne générale</p>
          <p className="text-2xl font-bold">
            {Math.round(students.reduce((acc, s) => acc + s.averageGrade, 0) / students.length)}%
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600">Cours suivis</p>
          <p className="text-2xl font-bold">
            {students.reduce((acc, s) => acc + s.enrolledCourses, 0)}
          </p>
        </div>
      </div>

      {/* Liste des étudiants */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Étudiant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cours suivis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Complétés
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Moyenne
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière activité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{student.enrolledCourses}</td>
                  <td className="px-6 py-4">{student.completedCourses}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${
                      student.averageGrade >= 80 ? 'text-green-600' :
                      student.averageGrade >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {student.averageGrade}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'actif'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {student.lastActive.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">✏️</button>
                    <button className="text-red-600 hover:text-red-900">🚫</button>
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

export default StudentManagement;