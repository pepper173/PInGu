import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-modul-lp3-b3',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class LP3_B3 extends H5pModuleBase {
  override h5pPathOverride = '/assets/h5p/LP3/B3';
  override moduleTitle = 'Pingu-Roboter — Hindernisse!';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate(['/cubi-level', '2']);
  }

  override onNext(): void {
    // After H5P 3 → CUBI Level 3
    this.router.navigate(['/cubi-level', '3']);
  }
}