import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-binaerer-bob-code-b7',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrl: '../h5p-module.scss',
})
export class B7 extends H5pModuleBase {
  override moduleTitle = 'Binärsystem – Finale';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/binaerer-bob-code/B6')]);
  }

  override onNext(): void {
    this.router.navigate(['/CLP']);
  }
}
