import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentSignupHeaderComponent } from './header/student-signup-header';
import { StudentSignupBodyComponent } from './body/student-signup-body';
import { StudentAuthService } from '../../auth/student/studentAuth.service';

@Component({
  selector: 'app-student-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentSignupHeaderComponent,
    StudentSignupBodyComponent
  ],
  templateUrl: './student-signup.html',
  styleUrls: ['./student-signup.scss']
})
export class StudentSignupComponent {
  form: FormGroup;
  private studentService = inject(StudentAuthService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      classCode: ['', [Validators.required]],
      studentCode: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Formulardaten:', this.form.value);

    const { classCode, studentCode } = this.form.value as {
      classCode: string;
      studentCode: string;
    };
  }

  //   const validStudentCode = this.studentService.checkStudentCode(studentCode);
  //   validStudentCode.subscribe(isValid => {
  //     if (isValid) {
  //       this.registerStudent(classCode, studentCode);
  //     } else {
  //       console.log('Ungültiger Schüler-Code');
  //       this.form.get('studentCode')?.setErrors({ invalidCode: true });
  //     }
  //   });
  // }

  // private registerStudent(classCode: string, studentCode: string): void {
  //   this.studentService.registerStudent(classCode, studentCode).subscribe({
  //     next: (response) => {
  //       console.log('Registrierung erfolgreich:', response);
  //     },
  //     error: (error) => {
  //       console.error('Fehler bei der Registrierung:', error);
  //     }
  //   });
  // }
}
