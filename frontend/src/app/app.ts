import { Component } from '@angular/core';
import { StudentLoginHeader } from './components/login/student-login-header';
import { StudentLoginPingu } from './components/login/student-login-pingu';
import { StudentLogin } from './components/login/student-login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentLoginHeader, StudentLoginPingu, StudentLogin],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  onSubmit(code: string) {
    console.log('Login-Code:', code);
  }
}