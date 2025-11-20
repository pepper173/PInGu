import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';
import { ClassesComponent } from './body/body';
import { ClassPopupComponent } from './popup/popup';

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
  isClassPopupVisible = false;

  hideClassPopup() {
    this.isClassPopupVisible = false;
  }

  onAddClass() {
    this.isClassPopupVisible = true;
  }

  onLogout() {
    // Logout-Logik oder Event nach oben geben
    console.log('Teacher logged out');
  }
}
