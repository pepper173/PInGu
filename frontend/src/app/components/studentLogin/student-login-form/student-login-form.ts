import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-login-form.html',
  styleUrls: ['./student-login-form.scss']
})
export class StudentLoginForm {
  @Output() submitCode = new EventEmitter<string>();

  code = new FormControl('', {
    nonNullable: true,
    validators: [Validators.minLength(4)]
  });

  submit() {
    this.code.valid
      ? this.submitCode.emit(this.code.value.trim())
      : this.code.markAsTouched();
  }
}
