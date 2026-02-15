import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';
@Component({
  selector: 'app-freizeit-e2',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class E2 extends H5pModuleBase {
  override moduleTitle = 'Freizeitbeschäftigung - Teil 2';
  override showNavigationButtons = true;
  override showBackButton = true;

  override onNext(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/freizeit/E3')]);
  }

  override onBackToPrevious(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/freizeit/E1')]);
  }
}
