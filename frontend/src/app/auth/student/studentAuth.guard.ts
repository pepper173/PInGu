import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StudentAuthService } from './studentAuth.service';

export const studentAuthGuard: CanActivateFn = () => {
  const auth = inject(StudentAuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  router.navigate(['/studentLogin']);
  return false;
};
