import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div style="display:flex;justify-content:center;align-items:center;min-height:100vh;flex-direction:column;font-family:system-ui,sans-serif;color:#666;">
      <h2>Seite nicht gefunden</h2>
      <p>Die angeforderte Seite existiert nicht.</p>
      <button (click)="goHome()" style="margin-top:1rem;padding:0.5rem 1.5rem;border:1px solid #ccc;border-radius:6px;background:#f8f9fa;cursor:pointer;">Zur Startseite</button>
    </div>
  `,
})
export class NotFound {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/student-login']);
  }
}