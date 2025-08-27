import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-student-login-header',
  standalone: true,
  templateUrl: './student-login-header.html',
  styleUrls: ['./student-login-header.scss'],
})
export class StudentLoginHeader {
  title = signal('Willkommen bei den PInGu Lernpfaden!'); // Test der Signal Funtkion 
}