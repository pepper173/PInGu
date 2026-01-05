import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header';
import { ClassesComponent } from './body/body';
import { ClassPopupComponent } from './popup/popup';
import { SchoolClass } from '../../data/class.model';
import { ClassService } from '../../data/class.service';
import {TeacherAuthService} from '../../auth/teacher/teacherAuth.service';

@Component({
  selector: 'app-teacher-view',
  standalone: true,
  templateUrl: './teacherOverview.html',
  imports: [
    HeaderComponent,
    ClassesComponent,
    ClassPopupComponent
  ],
})

export class TeacherOverviewComponent{
  classes: SchoolClass[] = [];
  isLoading = false;
  errorMessage = '';
  private auth: TeacherAuthService = inject(TeacherAuthService);

  isClassPopupVisible = false;
  private classService = inject(ClassService);

  ngOnInit(): void {
    this.loadClasses();
  }

  onCreate(newClass: SchoolClass){
    const payload = { ...newClass, lehrerId: this.auth.user().id };
    this.classService.createClass(payload).subscribe({
      next: (res) => {
        console.log('Klasse erfolgreich erstellt:', res);
        this.loadClasses();
        this.hideClassPopup();
      },
      error: (err) => {
        console.error('Fehler beim Erstellen der Klasse:', err);
      }
    });
  }

  hideClassPopup() {
    this.isClassPopupVisible = false;
  }

  onAddClass() {
    this.isClassPopupVisible = true;
  }

  onLogout() {
    this.auth.logout();
  }

  private loadClasses() {
    this.isLoading = true;
    this.errorMessage = '';

    this.classService.getClasses(this.auth.user().id).subscribe({
      next: (classes) => {
        this.classes = classes;

        for (const c of this.classes) {
          c.isOpen = false;
          this.classService.getStudentsByClass(c.id).subscribe({
            next: (students) => {
              c.students = students;
            },
            error: (err) => {
              console.error('Fehler beim Laden der Schüler:', err);
              this.errorMessage = 'Fehler beim Laden der Schüler.';
            }
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Fehler beim Laden der Klassen.';
        this.isLoading = false;
      }
    });
  }
}
