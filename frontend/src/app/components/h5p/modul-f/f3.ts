import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-modul-f-f3',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class F3 extends H5pModuleBase {
  override moduleTitle = 'Modul F - Kapitel 3';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onNext(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/F/F4')]);
  }

  override onBackToPrevious(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/F/F2')]);
  }
}
