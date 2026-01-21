import {Component} from '@angular/core';
import {H5pModuleBase} from '../../h5p-module-base';

@Component({
  selector: 'app-digitale-zeitreisen-c3',
  standalone: true,
  templateUrl: '../digitale-zeitreisen-module.html',
  styleUrl: '../digitale-zeitreisen-module.scss',
})
export class DigitaleZeitreisenC3 extends H5pModuleBase {
  moduleTitle = 'Digitale Zeitreise - Teil 3';
  showBackButton = true;
  nextButtonLabel = 'Abschließen';

  onBackToPrevious(): void {
    this.router.navigate(['/digitale-zeitreisen', encodeURIComponent('/assets/h5p/digitale-zeitreisen/C2')]);
  }

  onNext(): void {
    this.router.navigate(['/CLP']);
  }
}

