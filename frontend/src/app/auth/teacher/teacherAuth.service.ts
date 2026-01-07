import {Injectable, signal, computed, Signal, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {RegisterPayload, RegisterResponse, User} from './teacherAuth.model';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {API_URL_LOCAL, API_URL_PROD} from '../../temp_globals';

@Injectable({ providedIn: 'root' })
export class TeacherAuthService {
  private readonly baseUrl: string = API_URL_PROD;
  private _user = signal<User | null>(null);

  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  user: Signal<User> = computed(() => this._user());
  isLoggedIn: Signal<boolean> = computed(() => !!this._user());

  loadCurrentUser(): Observable<unknown> {
    return this.http
      .get<{ user: User }>(this.baseUrl + 'auth/teacher')
      .pipe(tap({
          next: (res) => this._user.set(res.user),
          error: () => this._user.set(null),
        }),
        catchError(() => {
          this._user.set(null);
          return of(null);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<{ user: User }>(this.baseUrl + 'auth/teacher/login', { email, password })
      .pipe(tap((res) => this._user.set(res.user)));
  }

  register(payload: RegisterPayload) {
    return this.http
      .post<RegisterResponse>(this.baseUrl + 'auth/teacher/signup', payload)
      .pipe(
        tap((res) => {
          this._user.set(res.user);
        })
      );
  }

  logout() {
    this.http.post(this.baseUrl + 'auth/teacher/logout', {}).subscribe({
      next: () => {
        this._user.set(null);
        this.router.navigate(['/']);
        },
      error: () => this._user.set(null), //TODO: error handling
    });
  }
}
