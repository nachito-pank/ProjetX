// components/enseignant/GradeManagement.tsx
import React, { useState } from 'react';
import { Card, Button } from '@/components/common';

interface StudentGrade {
  id: string;
  name: string;
  email: string;
  course: string;
  assignment: string;
  submittedDate: string;
  grade?: number;
  maxGrade: number;
  status: 'soumis' | 'en-cours' | 'noté';
}

const GradeManagement: React.FC = () => {
  const [submissions, setSubmissions] = useState<StudentGrade[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@email.com',
      course: 'React pour débutants',
      assignment: 'Projet final - Todo App',
      submittedDate: '2024-01-15',
      maxGrade: 100,
      status: 'soumis'
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@email.com',
      course: 'React pour débutants',
      assignment: 'Projet final - Todo App',
      submittedDate: '2024-01-14',
      maxGrade: 100,
      status: 'soumis'
    },
    {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie@email.com',
      course: 'TypeScript avancé',
      assignment: 'Exercice sur les types génériques',
      submittedDate: '2024-01-13',
      grade: 85,
      maxGrade: 100,
      status: 'noté'
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState<StudentGrade | null>(null);
  const [grade, setGrade] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');

  const handleGradeSubmit = (studentId: string): void => {
    setSubmissions(submissions.map(s => 
      s.id === studentId 
        ? { ...s, grade, status: 'noté' }
        : s
    ));
    setSelectedStudent(null);
    setGrade(0);
    setFeedback('');
    alert('Note enregistrée avec succès !');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des notes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des soumissions */}
        <div className="lg:col-span-1">
          <Card title="À corriger" icon="📝">
            <div className="space-y-3">
              {submissions
                .filter(s => s.status !== 'noté')
                .map((submission) => (
                  <button
                    key={submission.id}
                    onClick={() => setSelectedStudent(submission)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedStudent?.id === submission.id
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <p className="font-medium">{submission.name}</p>
                    <p className="text-sm text-gray-600">{submission.assignment}</p>
                    <p className="text-xs text-gray-400 mt-1">Soumis le {submission.submittedDate}</p>
                  </button>
                ))}
            </div>
          </Card>
        </div>

        {/* Zone de correction */}
        <div className="lg:col-span-2">
          {selectedStudent ? (
            <Card>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                  <p className="text-gray-600">{selectedStudent.email}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">{selectedStudent.assignment}</h3>
                  <p className="text-sm text-gray-600">
                    Cours: {selectedStudent.course}
                  </p>
                  <p className="text-sm text-gray-600">
                        Soumis le: {selectedStudent.submittedDate}
                      </p>
                    </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note (/{selectedStudent.maxGrade})
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={selectedStudent.maxGrade}
                    value={grade}
                    onChange={(e) => setGrade(Number(e.target.value))}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback
                  </label>
                  <textarea
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Donnez votre feedback à l'étudiant..."
                  />
                </div>

                <div className="flex space-x-4">
                  <Button 
                    variant="success" 
                    onClick={() => handleGradeSubmit(selectedStudent.id)}
                    disabled={!grade}
                  >
                    ✅ Enregistrer la note
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedStudent(null)}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📝</span>
                <h3 className="text-xl font-semibold text-gray-500">
                  Sélectionnez un devoir à corriger
                </h3>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Devoirs déjà notés */}
      <Card title="Devoirs notés" icon="✅">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left">Étudiant</th>
                <th className="px-4 py-3 text-left">Devoir</th>
                <th className="px-4 py-3 text-left">Note</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions
                .filter(s => s.status === 'noté')
                .map((submission) => (
                  <tr key={submission.id} className="border-b">
                    <td className="px-4 py-3">{submission.name}</td>
                    <td className="px-4 py-3">{submission.assignment}</td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-green-600">
                        {submission.grade}/{submission.maxGrade}
                      </span>
                    </td>
                    <td className="px-4 py-3">{submission.submittedDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default GradeManagement;