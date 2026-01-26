import {Component} from '@angular/core';
import {H5pModuleBase} from '../../h5p-module-base';

@Component({
  selector: 'app-digitale-zeitreisen-c2',
  standalone: true,
  templateUrl: '../../h5p-module.html',
  styleUrl: '../../h5p-module.scss',
})
export class C2 extends H5pModuleBase {
  override moduleTitle = 'Digitale Zeitreise - Teil 2';
  override showNavigationButtons = true;
  override showBackButton = true;


  override onBackToPrevious(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/digitale-zeitreisen/C1')]);
  }

  override onNext(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/digitale-zeitreisen/C3')]);
  }
}

