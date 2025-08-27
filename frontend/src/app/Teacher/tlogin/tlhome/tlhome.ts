//connects all files of the teacher login home page
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tloginfield, LoginPayload } from '../tloginfield/tloginfield';
import { SiteHeader } from '../../../components/site-header/site-header';


@Component({
  selector: 'app-tlhome',
  standalone: true,
  imports: [Tloginfield, SiteHeader],
  templateUrl: './tlhome.html',
  styleUrls: ['./tlhome.scss']
})
export class TLHome {
  constructor(private router: Router) {}

  onLogin(payload: LoginPayload) {
    // TODO: hier später echten Auth-Service aufrufen
    console.log('Login versendet:', payload);

    // Beispiel: nach erfolgreichem Login weiter navigieren
    // this.router.navigate(['/CLP']); 
  }

  onForgot() {
    // TODO: Dialog/Route zur Passwortrücksetzung
    console.log('Passwort vergessen geklickt');
  }
}