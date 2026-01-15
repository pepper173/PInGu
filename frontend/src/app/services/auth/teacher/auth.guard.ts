import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TeacherAuthService } from './teacherAuth.service'

export const authGuard: CanActivateFn = () => {
  const auth = inject(TeacherAuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    console.log('logged in');
    return true;
  }

  return router.createUrlTree(['/teacherLogin']);
};

