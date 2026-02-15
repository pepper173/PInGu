import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { A1 } from './einfuehrung/a1';
import { A2 } from './einfuehrung/a2';
import { A3 } from './einfuehrung/a3';
import { E1 } from './freizeit/e1';
import { E10 } from './freizeit/e10';
import { E11 } from './freizeit/e11';
import { E12 } from './freizeit/e12';
import { E13 } from './freizeit/e13';
import { E14 } from './freizeit/e14';
import { E15 } from './freizeit/e15';
import { E16 } from './freizeit/e16';
import { E2 } from './freizeit/e2';
import { E3 } from './freizeit/e3';
import { E4 } from './freizeit/e4';
import { E5 } from './freizeit/e5';
import { E6 } from './freizeit/e6';
import { E7 } from './freizeit/e7';
import { E8 } from './freizeit/e8';
import { E9 } from './freizeit/e9';
@Component({
  selector: 'app-digitale-zeitreisen-module',
  standalone: true,
  imports: [A1, A2, A3, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16],
  template: `
    @switch (module) {
      @case ('A1') { <app-einfuehrung-a1 /> }
      @case ('A2') { <app-einfuehrung-a2 /> }
      @case ('A3') { <app-einfuehrung-a3 /> }
      @case ('E1') { <app-freizeit-e1 /> }
      @case ('E2') { <app-freizeit-e2 /> }
      @case ('E3') { <app-freizeit-e3 /> }
      @case ('E4') { <app-freizeit-e4 /> }
      @case ('E5') { <app-freizeit-e5 /> }
      @case ('E6') { <app-freizeit-e6 /> }
      @case ('E7') { <app-freizeit-e7 /> }
      @case ('E8') { <app-freizeit-e8 /> }
      @case ('E9') { <app-freizeit-e9 /> }
      @case ('E10') { <app-freizeit-e10 /> }
      @case ('E11') { <app-freizeit-e11 /> }
      @case ('E12') { <app-freizeit-e12 /> }
      @case ('E13') { <app-freizeit-e13 /> }
      @case ('E14') { <app-freizeit-e14 /> }
      @case ('E15') { <app-freizeit-e15 /> }
      @case ('E16') { <app-freizeit-e16 /> }
      @default { <p style="color: red;">NO MATCH for: {{ module }}</p> }
    }
  `
})
export class H5pModuleRoutes implements OnInit {
  private route = inject(ActivatedRoute);
  module: string = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.module = decodeURIComponent(params['module']).split('/').pop();
    });
  }
}
