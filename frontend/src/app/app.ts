import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  template: '<router-outlet></router-outlet>',
})
export class App {
  onSubmit(code: string) {
    console.log('Login-Code:', code);
  }
}
