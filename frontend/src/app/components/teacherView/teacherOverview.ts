import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header';
import { ClassesComponent } from './body/body';
import { ClassPopupComponent } from './popup/popup';
import { Class } from '../../data/class.model';
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
  classes: Class[] = [];
  isLoading = false;
  errorMessage = '';
  private auth: TeacherAuthService = inject(TeacherAuthService);

  isClassPopupVisible = false;
  private classService = inject(ClassService);

  ngOnInit(): void {
    this.loadClasses();
    console.log('Aktueller User:', this.auth.user());
  }

  onCreate(newClass: Class){
    this.classService.createClass(newClass).subscribe({
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

}
