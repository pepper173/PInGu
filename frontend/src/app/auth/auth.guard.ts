import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment, Route } from '@angular/router';
import { TeacherAuthService } from './teacher/teacherAuth.service';

export const authGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const auth = inject(TeacherAuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    console.log('logged in');
    return true;
  }

  console.log('not logged in');
  return router.createUrlTree(['/teacherLogin']);
};
