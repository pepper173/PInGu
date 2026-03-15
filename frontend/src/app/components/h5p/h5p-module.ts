import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-digitale-zeitreisen-module',
  standalone: true,
  imports: [],
  template: `
    @switch (module) {
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
