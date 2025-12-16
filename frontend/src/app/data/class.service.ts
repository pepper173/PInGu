import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Class} from './class.model';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:3000/api/';

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.baseUrl + 'allClasses', {withCredentials: true});
  }

  createClass(neueKlasse: Class): Observable<any> {
    return this.http.post(this.baseUrl + 'class', neueKlasse, { withCredentials: true });
  }
}
