import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolClass } from '../../../data/class.model';

@Component({
  selector: 'app-class-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './popup.html',
  styleUrls: ['./popup.scss'],
})

export class ClassPopupComponent {
  isSubmitting: boolean = false;
  errorMessage: string = '';

  className: string = '';
  childrenCount: number;
  grade: number = 1;

  @Input() title = 'Default title';
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<SchoolClass>();

  onCreate() {
    const newClass: SchoolClass = {
      id: '',
      lehrerId: '',
      name: this.className,
      studentCount: this.childrenCount,
      grade: this.grade,
    };
    this.create.emit(newClass);
  }

  onClose() {
    this.close.emit();
  }
}
