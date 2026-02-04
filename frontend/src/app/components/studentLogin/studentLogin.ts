import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StudentAuthService } from '../../services/auth/student/studentAuth.service';
import { StudentLoginHeader } from './student-login-header/student-login-header';
import { StudentLoginPingu } from './student-login-pingu/student-login-pingu';
import { StudentLoginForm } from './student-login-form/student-login-form';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [StudentLoginHeader, StudentLoginPingu, StudentLoginForm],
  templateUrl: './studentLogin.html',
  styleUrls: ['./studentLogin.scss']
})
export class StudentLogin {
  private auth = inject(StudentAuthService);
  private router = inject(Router);

  onSubmit(code: string) {
    const trimmedCode = code.trim();
    this.auth.loginWithCode(trimmedCode).subscribe({
      next: () => {
        if (this.auth.isLoggedIn()) {
          this.router.navigate(['/CLP']);
        } else {
          console.log('Kritischer Fehler! Login fehlgeschlagen, trotz erfolgreicher Anmeldung.');
        }
      },
      error: (err) => {
        console.error('Fehler bei Anmeldung:', err);
      },
    });
  }
}
