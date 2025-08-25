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
  nonNullable: true,  // Code muss immer einen Wert haben
  validators: [
    Validators.required,
    Validators.pattern(/^[A-Z0-9]{5}$/)  // exakt 5 alphanumerische Zeichen
  ]
});

  submit() { 
    
    this.code.valid 
      ? this.submitCode.emit(this.code.value.trim()) 
      : this.code.markAsTouched(); 
  }
}
