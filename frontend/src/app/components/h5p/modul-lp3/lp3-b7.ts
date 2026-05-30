import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-modul-lp3-b7',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class LP3_B7 extends H5pModuleBase {
  override moduleTitle = 'Pingu-Roboter — Neustart';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate(['/cubi-level', '6']);
  }

  override onNext(): void {
    // After H5P 7 → CUBI Level 7 (final, no help)
    this.router.navigate(['/cubi-level', '7']);
  }
}