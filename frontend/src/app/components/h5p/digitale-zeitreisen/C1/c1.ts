import {Component} from '@angular/core';
import {H5pModuleBase} from '../../h5p-module-base';

@Component({
  selector: 'app-digitale-zeitreisen-c1',
  standalone: true,
  templateUrl: '../digitale-zeitreisen-module.html',
  styleUrl: '../digitale-zeitreisen-module.scss',
})
export class DigitaleZeitreisenC1 extends H5pModuleBase {
  moduleTitle = 'Digitale Zeitreise - Teil 1';
  showBackButton = false;
  nextButtonLabel = 'Weiter →';

  onBackToPrevious(): void {
    // Not used in C1
  }

  onNext(): void {
    this.router.navigate(['/digitale-zeitreisen', encodeURIComponent('/assets/h5p/digitale-zeitreisen/C2')]);
  }
}

