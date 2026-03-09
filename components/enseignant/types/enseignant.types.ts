// components/enseignant/types/enseignant.types.ts
export interface TeacherCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  price: number;
  students: number;
  progress: number;
  status: 'brouillon' | 'en-attente' | 'publié';
  lastUpdated: Date;
  image?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActivity: Date;
  grade?: number;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  dueDate: Date;
  submissions: number;
  totalStudents: number;
}

export interface TeacherStats {
  totalCourses: number;
  totalStudents: number;
  pendingGrading: number;
  averageRating: number;
}