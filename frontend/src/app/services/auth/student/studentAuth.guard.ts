import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StudentAuthService } from './studentAuth.service';

export const studentAuthGuard: CanActivateFn = async () => {
  const auth = inject(StudentAuthService);
  const router = inject(Router);

  // Always check with the server first (cookie persists across tabs)
  const result = await auth.checkAuth().toPromise();

  if (result && auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/student-login']);
  return false;
};