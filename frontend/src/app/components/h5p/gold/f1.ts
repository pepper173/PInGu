import {Component} from '@angular/core';
import {H5pModuleBase} from '../h5p-module-base';

@Component({
  selector: 'app-h5p-gold-f1',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrl: '../h5p-module.scss',
})
export class F1 extends H5pModuleBase {
  override moduleTitle = 'Gold - Ein interaktives Lernmodul';
  override showNavigationButtons = true;
  override showBackButton = true;

}
