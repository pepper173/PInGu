import {Component} from '@angular/core';
import {H5pModuleBase} from '../../h5p-module-base';

@Component({
  selector: 'app-digitale-zeitreisen-c2',
  standalone: true,
  templateUrl: '../digitale-zeitreisen-module.html',
  styleUrl: '../digitale-zeitreisen-module.scss',
})
export class DigitaleZeitreisenC2 extends H5pModuleBase {
  moduleTitle = 'Digitale Zeitreise - Teil 2';
  showBackButton = true;
  nextButtonLabel = 'Weiter →';


  onBackToPrevious(): void {
    this.router.navigate(['/digitale-zeitreisen', encodeURIComponent('/assets/h5p/digitale-zeitreisen/C1')]);
  }

  onNext(): void {
    this.router.navigate(['/digitale-zeitreisen', encodeURIComponent('/assets/h5p/digitale-zeitreisen/C3')]);
  }
}

