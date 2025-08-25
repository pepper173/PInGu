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
  constructor(private router: Router) {}

  onSubmit(code: string) {
   let x = getStudentData(); 
    console.log('Login-Code:', code); //LÖSCHEN

    //  Navigation zur CLP-Seite
    this.router.navigate(['/clp']); 

  }
}