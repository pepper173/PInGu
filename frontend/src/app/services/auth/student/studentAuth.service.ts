import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {Student} from './studentAuth.model';

@Injectable({ providedIn: 'root' })
export class StudentAuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private readonly baseUrl = environment.apiUrl;
  private _user = signal<Student | null>(null);

  user: Signal<Student> = computed(() => this._user());
  isLoggedIn:Signal<boolean> = computed(() => !!this._user());

  loginWithCode(code: string) {
    return this.http
      .post<{user: Student}>(`${this.baseUrl}auth/student/login`, { code },)
      .pipe(tap((res) => this._user.set(res.user)))
  }

  checkAuth() {
    return this.http.get<{user: Student}>(`${this.baseUrl}auth/student`)
      .pipe(
        tap((res) => this._user.set(res.user)),
        catchError(() => {
          this._user.set(null);
          return of(null);
        })
      );
  }

  logout() {
    this.http.post(this.baseUrl + 'auth/student/logout', {}).subscribe({
      next: () => {
        this._user.set(null);
        this.router.navigate(['/student-login']);
      },
      error: () => {
        this._user.set(null); // TODO: error handling
      },
    });
  }
}
