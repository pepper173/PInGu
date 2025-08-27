import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StudentLoginHeader } from '../student-login-header/student-login-header';
import { StudentLoginPingu } from '../student-login-pingu/student-login-pingu';
import { StudentLogin } from '../student-login/student-login';
import { serviceforStudentLogin } from '../SLoginServices/service-for-student-login';

@Component({
  selector: 'app-student-login-home',
  standalone: true,
  imports: [StudentLoginHeader, StudentLoginPingu, StudentLogin],
  templateUrl: './student-login-home.html',
  styleUrls: ['./student-login-home.scss']
})
export class StudentLoginHome {
  constructor(private router: Router, 
    private loginSvc: serviceforStudentLogin) {}

  onSubmit(code: string) {
    this.loginSvc.getStudentData().subscribe({
      next: (data) => {
        console.log('Daten vom Service:', data);
        console.log('Login-Code:', code);
        this.router.navigate(['/clp']); // oder '/CLP'
      },
      error: err => {
        console.error('Fehler beim Abrufen der Daten:', err);
    console.log('Login-Code:', code); //LÖSCHEN
      }
    }); 

    //  Navigation zur CLP-Seite
    this.router.navigate(['/clp']); 

  }
}