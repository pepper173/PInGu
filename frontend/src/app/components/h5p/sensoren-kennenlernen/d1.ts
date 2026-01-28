import {Component} from '@angular/core';
import {H5pModuleBase} from '../h5p-module-base';

@Component({
  selector: 'app-h5p-sensoren-d1',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrl: '../h5p-module.scss',
})
export class D1 extends H5pModuleBase {
  override moduleTitle = 'Sensoren kennenlernen – Teil 1';
  override showNavigationButtons = true;
  override showBackButton = false;

  override onNext(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/sensoren-kennenlernen/D2')]);
  }
}
