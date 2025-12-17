import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';

import { StudentLoginHeader } from '../student-login-header/student-login-header';
import { StudentLoginPingu } from '../student-login-pingu/student-login-pingu';
import { StudentLogin } from '../student-login/student-login';
import {StudentAuthService} from '../../../auth/student/studentAuth.service';

@Component({
  selector: 'app-student-login-home',
  standalone: true,
  imports: [StudentLoginHeader, StudentLoginPingu, StudentLogin],
  templateUrl: './student-login-home.html',
  styleUrls: ['./student-login-home.scss']
})
export class StudentLoginHome {
  constructor(private router: Router) {}
  private auth = inject(StudentAuthService);

  onSubmit(code: string) {
    console.log('Ich teste:', code);
    const trimmedCode = code.trim();
    this.auth.loginWithCode(trimmedCode);
  }
}
