import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:3000/api/';

  registerStudent(classCode: string, studentCode: string): Observable<any> {
    const payload = { classCode, studentCode };
    return this.http.post<any>(this.baseUrl+"student", payload);
  }

  checkStudentCode(studentCode: string): Observable<boolean> {
    const url = `${this.baseUrl}studentCode/${encodeURIComponent(studentCode)}`;
    return this.http.get<{ valid: boolean }>(url).pipe(
        map(response => response.valid));
  }
}