import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-modul-f-f4',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class F4 extends H5pModuleBase {
  override moduleTitle = 'Modul F - Kapitel 4';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/F/F3')]);
  }

  override onNext(): void {
    this.router.navigate(['/CLP']);
  }
}
