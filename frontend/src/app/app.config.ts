import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { TeacherAuthService } from './auth/teacher/teacherAuth.service';
import {StudentAuthService} from './auth/student/studentAuth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          if (req.url.includes('/api/')) {
            return next(req.clone({ withCredentials: true }));
          }
          return next(req);
        },
      ])
    ),
    provideAppInitializer(() => {
      const teacher = inject(TeacherAuthService);
      return teacher.loadCurrentUser();
    }),
    provideAppInitializer(() => {
      const student = inject(StudentAuthService);
      return student.checkAuth()
    }),
  ]
};
