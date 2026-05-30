import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-modul-lp3-b4',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class LP3_B4 extends H5pModuleBase {
  override moduleTitle = 'Pingu-Roboter — Erstes Paket';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate(['/cubi-level', '3']);
  }

  override onNext(): void {
    // After H5P 4 → CUBI Level 4
    this.router.navigate(['/cubi-level', '4']);
  }
}