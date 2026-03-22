import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { B1 } from './binaerer-bob-code/b1';
import { B2 } from './binaerer-bob-code/b2';
import { B3 } from './binaerer-bob-code/b3';
import { B4 } from './binaerer-bob-code/b4';
import { B5 } from './binaerer-bob-code/b5';
import { B6 } from './binaerer-bob-code/b6';
import { B7 } from './binaerer-bob-code/b7';

@Component({
  selector: 'app-digitale-zeitreisen-module',
  standalone: true,
  imports: [B1, B2, B3, B4, B5, B6, B7],
  template: `
    @switch (module) {
      @case ('B1') {<app-binaerer-bob-code-b1></app-binaerer-bob-code-b1>}
      @case ('B2') {<app-binaerer-bob-code-b2></app-binaerer-bob-code-b2>}
      @case ('B3') {<app-binaerer-bob-code-b3></app-binaerer-bob-code-b3>}
      @case ('B4') {<app-binaerer-bob-code-b4></app-binaerer-bob-code-b4>}
      @case ('B5') {<app-binaerer-bob-code-b5></app-binaerer-bob-code-b5>}
      @case ('B6') {<app-binaerer-bob-code-b6></app-binaerer-bob-code-b6>}
      @case ('B7') {<app-binaerer-bob-code-b7></app-binaerer-bob-code-b7>}
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
