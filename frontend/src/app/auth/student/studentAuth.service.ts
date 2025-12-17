import {inject, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StudentAuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private readonly baseUrl = 'http://localhost:3000/api/';

  readonly isAuthenticated = signal<boolean>(false);

  loginWithCode(code: string) {
  return this.http
    .post(
      `${this.baseUrl}auth/code`,
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
        this.router.navigate(['/studentLogin']);
      },
      error: () => {
        this.isAuthenticated.set(false); // TODO: error handling
      },
    });
  }
}
