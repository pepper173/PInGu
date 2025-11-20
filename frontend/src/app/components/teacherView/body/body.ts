import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Class } from '../../../data/class/class.model';
import { ClassService } from '../../../data/class/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './body.html',
  styleUrls: ['./body.scss']
})
export class ClassesComponent {
  private classService = inject(ClassService);

  classes: Class[] = [];
  isLoading = false;
  errorMessage = '';
  c: Class;

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.classService.getClasses().subscribe({
      next: (classes) => {
        this.classes = classes;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Fehler beim Laden der Klassen.';
        this.isLoading = false;
      }
    });
  }

  @Output() addClass = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onAddClass() {
    console.log('Klasse hinzufügen');
    this.addClass.emit();
  }

}
