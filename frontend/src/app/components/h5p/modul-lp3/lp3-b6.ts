import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-modul-lp3-b6',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class LP3_B6 extends H5pModuleBase {
  override moduleTitle = 'Pingu-Roboter — Die Sortierstation';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate(['/cubi-level', '5']);
  }

  override onNext(): void {
    // After H5P 6 → CUBI Level 6
    this.router.navigate(['/cubi-level', '6']);
  }
}