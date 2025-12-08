import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from './class.model';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/';

  getClasses(): Observable<Class[]> {
    var classes = this.http.get<Class[]>(this.baseUrl + 'allClasses');
    return classes;
  }

  createClass(neueKlasse: Class): Observable<any> {
   var newClass = this.http.post('class', neueKlasse);
   return newClass;
  }
}
