import {inject, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StudentAuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private readonly baseUrl = environment.apiUrl;
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
