import {Component} from '@angular/core';
import {H5pModuleBase} from '../h5p-module-base';

@Component({
  selector: 'app-einfuehrung-a3',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})

export class A3 extends H5pModuleBase {
  override moduleTitle = 'Einführung in Computer - Kapitel 3';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onNext(): void {
    this.router.navigate(['/CLP']);
  }

  override onBackToPrevious(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/einfuehrung/A2')]);
  }
}
