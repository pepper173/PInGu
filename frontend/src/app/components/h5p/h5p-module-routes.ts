import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { D1 } from './sensoren-kennenlernen/d1';
import { D10 } from './sensoren-kennenlernen/d10';
import { D11 } from './sensoren-kennenlernen/d11';
import { D12 } from './sensoren-kennenlernen/d12';
import { D13 } from './sensoren-kennenlernen/d13';
import { D14 } from './sensoren-kennenlernen/d14';
import { D2 } from './sensoren-kennenlernen/d2';
import { D3 } from './sensoren-kennenlernen/d3';
import { D4 } from './sensoren-kennenlernen/d4';
import { D5 } from './sensoren-kennenlernen/d5';
import { D6 } from './sensoren-kennenlernen/d6';
import { D7 } from './sensoren-kennenlernen/d7';
import { D8 } from './sensoren-kennenlernen/d8';
import { D9 } from './sensoren-kennenlernen/d9';
import { A1 } from './einfuehrung/a1';
import { A2 } from './einfuehrung/a2';
import { A3 } from './einfuehrung/a3';


@Component({
  selector: 'app-digitale-zeitreisen-module',
  standalone: true,
  imports: [A1, A2, A3, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14],
  template: `
    @switch (module) {
      @case ('A1') {<app-einfuehrung-a1></app-einfuehrung-a1> }
      @case ('A2') {<app-einfuehrung-a2></app-einfuehrung-a2> }
      @case ('A3') {<app-einfuehrung-a3></app-einfuehrung-a3> }
      @case ('D1') { <app-h5p-sensoren-d1></app-h5p-sensoren-d1> }
      @case ('D2') { <app-h5p-sensoren-d2></app-h5p-sensoren-d2> }
      @case ('D3') { <app-h5p-sensoren-d3></app-h5p-sensoren-d3> }
      @case ('D4') { <app-h5p-sensoren-d4></app-h5p-sensoren-d4> }
      @case ('D5') { <app-h5p-sensoren-d5></app-h5p-sensoren-d5> }
      @case ('D6') { <app-h5p-sensoren-d6></app-h5p-sensoren-d6> }
      @case ('D7') { <app-h5p-sensoren-d7></app-h5p-sensoren-d7> }
      @case ('D8') { <app-h5p-sensoren-d8></app-h5p-sensoren-d8> }
      @case ('D9') { <app-h5p-sensoren-d9></app-h5p-sensoren-d9> }
      @case ('D10') { <app-h5p-sensoren-d10></app-h5p-sensoren-d10> }
      @case ('D11') { <app-h5p-sensoren-d11></app-h5p-sensoren-d11> }
      @case ('D12') { <app-h5p-sensoren-d12></app-h5p-sensoren-d12> }
      @case ('D13') { <app-h5p-sensoren-d13></app-h5p-sensoren-d13> }
      @case ('D14') { <app-h5p-sensoren-d14></app-h5p-sensoren-d14> }
      @default { <p style="color: red;">NO MATCH for: {{ module }}</p> }
    }
  `
})
export class H5pModuleRoutes implements OnInit {
  private route = inject(ActivatedRoute);
  module: string = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.module = decodeURIComponent(params['module']).split('/').pop();
    });
  }
}
