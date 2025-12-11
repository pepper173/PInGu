export interface Student {
  id: string;
  name: string;
  classCode: string;
  studentCode: string;
}

export interface StudentCode {
    id: string;
    code: string;
    classCode: string;
    used: boolean;
}