export interface Class {
  id: string;
  name: string;
  lehrerId: string;
  childrenCount: number;
  code?: string;
  grade?: number | null;
}
