import {Student} from '../auth/student/studentAuth.model';

export interface Class {
  id: string;
  name: string;
  lehrerId: string;
  studentCount: number;
  students?: Student[];
  grade?: number | null;
  isOpen?: boolean;
}
