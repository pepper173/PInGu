import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Class } from '../../../data/class.model';

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
  grade: number | null;
  code: string = this.generateRandomCode();

  @Input() title = 'Default title';
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<Class>();

  onCreate() {
    const newClass: Class = {
      id: '',
      name: this.className,
      childrenCount: this.childrenCount,
      grade: this.grade,
      code: this.code,
    };
    this.create.emit(newClass);
  }

  onClose() {
    this.close.emit();
  }

  private generateRandomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
