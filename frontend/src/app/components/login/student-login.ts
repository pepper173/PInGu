import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-login.html',   // externes Template
  styleUrls: ['./student-login.scss']   // externe Styles
})
export class StudentLogin {
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
