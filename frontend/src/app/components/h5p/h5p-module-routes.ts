import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { B1 } from './binaerer-bob-code/b1';
import { B2 } from './binaerer-bob-code/b2';
import { C1 } from './digitale-zeitreisen/c1';
import { C2 } from './digitale-zeitreisen/c2';
import { C3 } from './digitale-zeitreisen/c3';
import { E } from './freizeit/e';

@Component({
  selector: 'app-digitale-zeitreisen-module',
  standalone: true,
  imports: [B1, B2, C1, C2, C3, E],
  template: `
    @if (module === 'B1') {
      <app-binaerer-bob-code-b1 />
    } @else if (module === 'B2') {
      <app-binaerer-bob-code-b2 />
    } @else if (module === 'C1') {
      <app-digitale-zeitreisen-c1 />
    } @else if (module === 'C2') {
      <app-digitale-zeitreisen-c2 />
    } @else if (module === 'C3') {
      <app-digitale-zeitreisen-c3 />
    } @else if (module.includes('E')) {
      <app-freizeit-e />
    } @else {
      <p style="color: red;">NO MATCH for: {{ module }}</p>
    }
  `
})

export class H5pModuleRoutes implements OnInit {
  private route = inject(ActivatedRoute);
  module: string = '';
  protected moduleChain: {[key: string]: any} = {
    'B': 'C',
    'C': 'E'
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.module = decodeURIComponent(params['module']).split('/').pop();
    });
  }
}
