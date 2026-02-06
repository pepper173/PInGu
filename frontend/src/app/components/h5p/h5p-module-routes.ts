import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { A1 } from './einfuehrung/a1';
import { A2 } from './einfuehrung/a2';
import { A3 } from './einfuehrung/a3';

@Component({
  selector: 'app-digitale-zeitreisen-module',
  standalone: true,
  imports: [A1, A2, A3],
  template: `
    @if (module === 'A1') {
      <app-einfuehrung-a1 />
    } @else if (module === 'A2'){
      <app-einfuehrung-a2 />
    } @else if (module === 'A3'){
      <app-einfuehrung-a3 />
    } @else {
      <p style="color: red;">NO MATCH for: {{ module }}</p>
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
