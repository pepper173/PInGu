import {inject, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {API_URL_PROD, API_URL_LOCAL} from '../../temp_globals';

@Injectable({ providedIn: 'root' })
export class StudentAuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private readonly baseUrl = typeof process !== 'undefined' && process.env && process.env['PINGU_ENV'] === 'server' ? API_URL_PROD : API_URL_LOCAL;

  readonly isAuthenticated = signal<boolean>(false);

  loginWithCode(code: string) {
  return this.http
    .post(
      `${this.baseUrl}auth/student/login`,
      { code },
    )
    .subscribe({
      next: () => {
        this.isAuthenticated.set(true);
        this.router.navigate(['/CLP']);
      },
      error: () => {
        this.isAuthenticated.set(false);
        // TODO: error handling (Toast, Message, etc.)
      },
    });
  }

  checkAuth() {
  return this.http
    .get(`${this.baseUrl}auth/student`)
    .pipe(
      tap(() => this.isAuthenticated.set(true)),
      catchError(() => {
        this.isAuthenticated.set(false);
        return of(null);
      })
    );
  }

  logout() {
    this.http.post(this.baseUrl + 'auth/student/logout', {}).subscribe({
      next: () => {
        this.isAuthenticated.set(false);
        this.router.navigate(['/student-login']);
      },
      error: () => {
        this.isAuthenticated.set(false); // TODO: error handling
      },
    });
  }
}
