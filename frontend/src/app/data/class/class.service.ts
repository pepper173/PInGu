import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from './class.model';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:3000/api/allClasses';

  getClasses(): Observable<Class[]> {
    var test = this.http.get<Class[]>(this.baseUrl);
    return test;
  }
}
