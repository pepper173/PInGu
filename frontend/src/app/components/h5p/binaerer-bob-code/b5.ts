import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-binaerer-bob-code-b5',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrl: '../h5p-module.scss',
})
export class B5 extends H5pModuleBase {
  override moduleTitle = 'Binärsystem – Abschluss';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/binaerer-bob-code/B4')]);
  }

  override onNext(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/binaerer-bob-code/B6')]);
  }
}
