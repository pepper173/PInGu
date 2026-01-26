import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { B1 } from './binaerer-bob-code/B1/b1';
import { B2 } from './binaerer-bob-code/B2/b2';
import { C1 } from './digitale-zeitreisen/C1/c1';
import { C2 } from './digitale-zeitreisen/C2/c2';
import { C3 } from './digitale-zeitreisen/C3/c3';

@Component({
  selector: 'app-digitale-zeitreisen-module',
  standalone: true,
  imports: [B1, B2, C1, C2, C3],
  template: `
    @switch (module) {
      @case ('B1') {
        <app-binaerer-bob-code-b1 />
      }
      @case ('B2') {
        <app-binaerer-bob-code-b2 />
      }
      @case ('C1') {
        <app-digitale-zeitreisen-c1 />
      }
      @case ('C2') {
        <app-digitale-zeitreisen-c2 />
      }
      @case ('C3') {
        <app-digitale-zeitreisen-c3 />
      }
      @default {
        <p style="color: red;">NO MATCH for: {{ module }}</p>
      }
    }
  `
})

export class LearningModulesRoute implements OnInit {
  private route = inject(ActivatedRoute);
  module: string = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.module = decodeURIComponent(params['module']).split('/').pop();
    });
  }
}
