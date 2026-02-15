import { Component } from '@angular/core';
import { H5pModuleBase } from '../h5p-module-base';
@Component({
  selector: 'app-freizeit-e1',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class E1 extends H5pModuleBase {
  override moduleTitle = 'Freizeitbeschäftigung - Teil 1';
  override showNavigationButtons = true;
  override showBackButton = false;

  override onNext(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/freizeit/E2')]);
  }
}
