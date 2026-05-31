import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface CubiFeedback {
  id?: string;
  studentId: string;
  levelId: string;
  rating: 'happy' | 'neutral' | 'sad';
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class CubiFeedbackService {
  private readonly baseUrl: string = environment.apiUrl + 'cubi';
  private http: HttpClient = inject(HttpClient);

  saveFeedback(studentId: string, levelId: string, rating: 'happy' | 'neutral' | 'sad') {
    return this.http.post<CubiFeedback>(`${this.baseUrl}/feedback`, {
      studentId,
      levelId,
      rating,
    });
  }

  getFeedback(studentId: string, levelId: string) {
    return this.http.get<CubiFeedback>(`${this.baseUrl}/feedback/${studentId}/${levelId}`);
  }

  getCompletedLevels(studentId: string) {
    return this.http.get<{ studentId: string; completedLevels: string[] }>(`${this.baseUrl}/feedback/${studentId}`);
  }
}