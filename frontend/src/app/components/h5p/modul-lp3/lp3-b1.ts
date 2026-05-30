import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-modul-lp3-b1',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class LP3_B1 extends H5pModuleBase {
  override moduleTitle = 'Pingu-Roboter — Die Reise beginnt';
  override showNavigationButtons = true;
  override showBackButton = false;

  override onNext(): void {
    // After H5P 1 → CUBI Level 1
    this.router.navigate(['/cubi-level', '1']);
  }
}