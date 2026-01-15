import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { TeacherAuthService } from '../../services/auth/teacher/teacherAuth.service';

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
})
export class TeacherSignupComponent {
  private fb = inject(FormBuilder);
  private auth = inject(TeacherAuthService);
  private router = inject(Router);

  loading = false;
  error: string | null = null;

  form = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  get passwordMismatch() {
    return this.form.hasError('passwordMismatch') &&
      this.form.get('confirmPassword')?.touched;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = null;

    const { email, password } = this.form.value;

    this.auth
      .register({
        email: email!,
        password: password!,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/teacher-overview']);
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Signup failed.';
          console.error(err);
        },
      });
  }
}
