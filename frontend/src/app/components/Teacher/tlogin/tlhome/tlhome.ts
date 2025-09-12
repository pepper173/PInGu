//connects all files of the teacher login home page
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TlHeader } from '../tlheader/tlheader';
import { Tloginfield, LoginPayload } from '../tloginfield/tloginfield';

@Component({
  selector: 'app-tlhome',
  standalone: true,
  imports: [TlHeader, Tloginfield],
  templateUrl: './tlhome.html',
  styleUrls: ['./tlhome.scss']
})
export class TLHome {
  constructor(private router: Router) {}

  onStudentClick() {
    // Hier entscheidest du, was passieren soll:
    // z.B. Info-Banner zeigen, Route wechseln oder Flag setzen
    console.log('Grundschüler:in-Button geklickt');
     this.router.navigate(['']);
  }

  onLogin(payload: LoginPayload) {
    console.log('Login versendet:', payload);
    // TODO: Auth-Service einhängen, dann z.B.:
    // this.router.navigate(['/CLP']);
  }

  onForgot() {
    console.log('Passwort vergessen');
  }
}