import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { C1 } from './digitale-zeitreisen/c1';
import { C2 } from './digitale-zeitreisen/c2';
import { C3 } from './digitale-zeitreisen/c3';

@Component({
  selector: 'app-digitale-zeitreisen-module',
  standalone: true,
  imports: [C1, C2, C3],
  template: `
    @switch (module) {
      @case ('C1') {<app-digitale-zeitreisen-c1></app-digitale-zeitreisen-c1>}
      @case ('C2') {<app-digitale-zeitreisen-c2></app-digitale-zeitreisen-c2>}
      @case ('C3') {<app-digitale-zeitreisen-c3></app-digitale-zeitreisen-c3>}
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
