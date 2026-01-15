import {Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {TeacherAuthService} from '../../services/auth/teacher/teacherAuth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './teacherLogin.html',
  styleUrls: ['./teacherLogin.scss']
})
export class teacherLogin {
  loginForm: FormGroup;
  private router: Router = inject(Router);
  private auth: TeacherAuthService = inject(TeacherAuthService);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.log('Formular ist ungültig');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).subscribe({
      next: () => {
        if (this.auth.isLoggedIn()) {
          this.router.navigate(['/teacher-overview']);
        } else {
          console.log('Kritischer Fehler! Login fehlgeschlagen, trotz erfolgreicher Anmeldung.');
        }
      },
      error: (err) => {
        console.error('Fehler bei Anmeldung:', err);
      }
    });
  }
}
