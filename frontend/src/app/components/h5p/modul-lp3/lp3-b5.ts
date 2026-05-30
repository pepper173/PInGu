import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-modul-lp3-b5',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class LP3_B5 extends H5pModuleBase {
  override h5pPathOverride = '/assets/h5p/LP3/B5';
  override moduleTitle = 'Pingu-Roboter — Zwei Pakete';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate(['/cubi-level', '4']);
  }

  override onNext(): void {
    // After H5P 5 → CUBI Level 5
    this.router.navigate(['/cubi-level', '5']);
  }
}