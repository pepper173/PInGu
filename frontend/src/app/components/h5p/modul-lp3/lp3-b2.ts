import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-modul-lp3-b2',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class LP3_B2 extends H5pModuleBase {
  override h5pPathOverride = '/assets/h5p/LP3/B2';
  override moduleTitle = 'Pingu-Roboter — Neue Richtung';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    // Back to CUBI Level 1 feedback? No — go back to CUBI level
    this.router.navigate(['/cubi-level', '1']);
  }

  override onNext(): void {
    // After H5P 2 → CUBI Level 2
    this.router.navigate(['/cubi-level', '2']);
  }
}