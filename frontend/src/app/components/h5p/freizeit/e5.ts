import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';
@Component({
  selector: 'app-freizeit-e5',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class E5 extends H5pModuleBase {
  override moduleTitle = 'Freizeitbeschäftigung - Teil 5';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onNext(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/freizeit/E6')]);
  }

  override onBackToPrevious(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/freizeit/E4')]);
  }
}
