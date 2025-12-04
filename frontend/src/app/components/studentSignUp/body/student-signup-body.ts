import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-signup-body',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-signup-body.html',
  styleUrls: ['./student-signup-body.scss']
})
export class StudentSignupBodyComponent {
  @Input({ required: true }) form!: FormGroup;
  @Output() submitForm = new EventEmitter<void>();

  onSubmit(): void {
    this.submitForm.emit();
  }
}
