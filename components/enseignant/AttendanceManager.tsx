// components/enseignant/AttendanceManager.tsx
import React, { useState } from 'react';
import { Card, } from '../common/card';
import {Button} from '../common/button'

interface Student {
  id: string;
  name: string;
  present: boolean;
}

const AttendanceManager: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Alice Johnson', present: false },
    { id: '2', name: 'Bob Smith', present: false },
    { id: '3', name: 'Charlie Brown', present: false },
    { id: '4', name: 'Diana Prince', present: false },
    { id: '5', name: 'Ethan Hunt', present: false },
  ]);

  const [selectedCourse, setSelectedCourse] = useState<string>('react');

  const courses = [
    { id: 'react', name: 'React pour débutants' },
    { id: 'typescript', name: 'TypeScript avancé' },
    { id: 'nodejs', name: 'Node.js' },
  ];

  const toggleAttendance = (studentId: string): void => {
    setStudents(students.map(s =>
      s.id === studentId ? { ...s, present: !s.present } : s
    ));
  };

  const markAllPresent = (): void => {
    setStudents(students.map(s => ({ ...s, present: true })));
  };

  const markAllAbsent = (): void => {
    setStudents(students.map(s => ({ ...s, present: false })));
  };

  const saveAttendance = (): void => {
    const presentCount = students.filter(s => s.present).length;
    alert(`Présences enregistrées !\n${presentCount}/${students.length} étudiants présents`);
  };

  const presentCount = students.filter(s => s.present).length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des présences</h1>

      {/* Sélecteurs */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cours
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Statistiques de présence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Présents</p>
          <p className="text-2xl font-bold text-green-700">{presentCount}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600">Absents</p>
          <p className="text-2xl font-bold text-red-700">{students.length - presentCount}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Total</p>
          <p className="text-2xl font-bold text-blue-700">{students.length}</p>
        </div>
      </div>

      {/* Liste des étudiants */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Liste des étudiants</h2>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={markAllPresent}>
              ✅ Tous présents
            </Button>
            <Button variant="outline" size="sm" onClick={markAllAbsent}>
              ❌ Tous absents
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                student.present
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => toggleAttendance(student.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  student.present
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-400'
                }`}>
                  {student.present && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`font-medium ${
                  student.present ? 'text-green-800' : 'text-gray-700'
                }`}>
                  {student.name}
                </span>
              </div>
              <span className={`text-sm ${
                student.present ? 'text-green-600' : 'text-gray-500'
              }`}>
                {student.present ? 'Présent' : 'Absent'}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button  onClick={saveAttendance} className="w-full">
            💾 Enregistrer les présences
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AttendanceManager;