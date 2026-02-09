import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-screen',
  standalone: true,
  templateUrl: './endScreen.html',
  styleUrls: ['./endScreen.scss'],
})
export class EndScreen implements OnInit, OnDestroy {
  private router = inject(Router);
  private timeoutId?: number;

  title = 'Geschafft!';
  subtitle = 'Du hast alle Kapitel abgeschlossen.';
  showOverlay = true;

  ngOnInit() {
    this.timeoutId = window.setTimeout(() => {
      this.continue();
    }, 2000);
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  continue() {
    this.showOverlay = false;
    this.router.navigate(['/CLP']);
  }
}
