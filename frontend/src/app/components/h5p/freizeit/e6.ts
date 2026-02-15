import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';
@Component({
  selector: 'app-freizeit-e6',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class E6 extends H5pModuleBase {
  override moduleTitle = 'Freizeitbeschäftigung - Teil 6';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onNext(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/freizeit/E7')]);
  }

  override onBackToPrevious(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/freizeit/E5')]);
  }
}
