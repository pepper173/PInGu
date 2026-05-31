import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-modul-lp3-b8',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class LP3_B8 extends H5pModuleBase {
  override h5pPathOverride = '/assets/h5p/LP3/B8';
  override moduleTitle = 'Pingu-Roboter — Abschluss';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    // Back to CUBI Level 7
    this.router.navigate(['/cubi-level', '7']);
  }

  override onNext(): void {
    // End of LP3 — navigate back to learning path overview
    this.router.navigate(['/CLP']);
  }
}