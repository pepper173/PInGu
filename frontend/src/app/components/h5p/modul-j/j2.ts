import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-modul-j-j2',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class J2 extends H5pModuleBase {
  override moduleTitle = 'Modul J - Kapitel 2';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/J/J1')]);
  }

  override onNext(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/J/J3')]);
  }
}
