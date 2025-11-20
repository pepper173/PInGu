import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface KlasseDto {
  name: string;
  childrenCount: number;
  code: string;
  grade?: number | null;
}

@Component({
  selector: 'app-class-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './popup.html',
  styleUrls: ['./popup.scss'],
})
export class ClassPopupComponent {
  @Input() title = 'Neue Klasse';
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<KlasseDto>();

  className = '';
  childrenCount?: number;
  code = this.generateRandomCode();
  grade?: number | null;

  isSubmitting = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onCreate() {
    if (!this.className || !this.childrenCount || !this.code) {
      this.errorMessage = 'Bitte alle Pflichtfelder ausfüllen.';
      return;
    }
    const neueKlasse: KlasseDto = {
      name: this.className,
      childrenCount: this.childrenCount,
      code: this.code,
      grade: this.grade ?? null,
    };

    this.isSubmitting = true;
    this.errorMessage = '';

    //TODO: In eigenen Service auslagern
    this.http.post('http://localhost:3000/api/test', neueKlasse).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        console.log('Antwort vom Server:', res);
        this.created.emit(neueKlasse); 
        this.close.emit(); 
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        this.errorMessage = 'Fehler beim Erstellen der Klasse.';
      },
    });
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
