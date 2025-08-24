import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StudentLoginHeader } from '../student-login-header/student-login-header';
import { StudentLoginPingu } from '../student-login-pingu/student-login-pingu';
import { StudentLogin } from '../student-login/student-login';

@Component({
  selector: 'app-student-login-home',
  standalone: true,
  imports: [StudentLoginHeader, StudentLoginPingu, StudentLogin],
  templateUrl: './student-login-home.html',
  styleUrls: ['./student-login-home.scss']
})
export class StudentLoginHome {
  constructor(private router: Router) {}

  onSubmit(code: string) {
    console.log('Login-Code:', code);

    // ✅ Navigation zur CLP-Seite
    this.router.navigate(['/CLP']); // Groß-/Kleinschreibung wie in deinen Routes!
  }
}