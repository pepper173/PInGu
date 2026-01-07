import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SchoolClass} from './class.model';
import { API_URL_LOCAL, API_URL_PROD} from '../temp_globals';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private http = inject(HttpClient);

  private readonly baseUrl = API_URL_PROD;

  getClasses(teacherId: string): Observable<SchoolClass[]> {
    return this.http.get<SchoolClass[]>(`${this.baseUrl}class/${teacherId}`);
  }

  createClass(newClass: SchoolClass): Observable<any> {
    return this.http.post(this.baseUrl + 'class', newClass);
  }

  getStudentsByClass(classId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}students/${classId}`);
  }
}
