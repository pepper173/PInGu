import {Component} from '@angular/core';
import {H5pModuleBase} from '../h5p-module-base';

@Component({
  selector: 'app-einfuehrung-a1',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class A1 extends H5pModuleBase {
  override moduleTitle = 'Einführung in Computer - Kapitel 1';
  override showNavigationButtons = true;
  override showBackButton = false;

  override onNext(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/einfuehrung/A2')]);
  }
}
