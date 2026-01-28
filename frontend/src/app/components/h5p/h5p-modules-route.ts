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
      @case ('E1') {
        <app-freizeit-e />
      }
      @case ('E2') {
        <app-freizeit-e />
      }
      @case ('E3') {
        <app-freizeit-e />
      }
      @case ('E4') {
        <app-freizeit-e />
      }
      @case ('E5') {
        <app-freizeit-e />
      }
      @case ('E6') {
        <app-freizeit-e />
      }
      @case ('E7') {
        <app-freizeit-e />
      }
      @case ('E8') {
        <app-freizeit-e />
      }
      @case ('E9') {
        <app-freizeit-e />
      }
      @case ('E10') {
        <app-freizeit-e />
      }
      @case ('E11') {
        <app-freizeit-e />
      }
      @case ('E12') {
        <app-freizeit-e />
      }
      @case ('E13') {
        <app-freizeit-e />
      }
      @case ('E14') {
        <app-freizeit-e />
      }
      @case ('E15') {
        <app-freizeit-e />
      }
      @default {
        <p style="color: red;">NO MATCH for: {{ module }}</p>
      }
    }
  `
})

export class H5pModulesRoute implements OnInit {
  private route = inject(ActivatedRoute);
  module: string = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.module = decodeURIComponent(params['module']).split('/').pop();
    });
  }
}
