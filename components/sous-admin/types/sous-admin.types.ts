export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  price: number;
  students: number;
  status: 'actif' | 'inactif' | 'en-attente';
  createdAt: Date;
  image?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  completedCourses: number;
  averageGrade: number;
  status: 'actif' | 'inactif';
  lastActive: Date;
}

export interface SousAdminStats {
  totalCourses: number;
  totalStudents: number;
  activeCourses: number;
  pendingApprovals: number;
  revenue: number;
}