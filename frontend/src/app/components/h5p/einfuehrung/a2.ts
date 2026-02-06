import {Component} from '@angular/core';
import {H5pModuleBase} from '../h5p-module-base';

@Component({
  selector: 'app-einfuehrung-a2',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class A2 extends H5pModuleBase {
  override moduleTitle = 'Einführung in Computer - Teil 2';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onNext(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/einfuehrung/A3')]);
  }

  override onBackToPrevious(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/einfuehrung/A1')]);
  }
}
