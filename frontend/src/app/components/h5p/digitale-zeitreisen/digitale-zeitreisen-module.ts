import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DigitaleZeitreisenC1 } from './C1/c1';
import { DigitaleZeitreisenC2 } from './C2/c2';
import { DigitaleZeitreisenC3 } from './C3/c3';

@Component({
  selector: 'app-digitale-zeitreisen-module',
  standalone: true,
  imports: [DigitaleZeitreisenC1, DigitaleZeitreisenC2, DigitaleZeitreisenC3],
  template: `
    @switch (module) {
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

export class DigitaleZeitreisenModule implements OnInit {
  private route = inject(ActivatedRoute);
  module: string = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.module = decodeURIComponent(params['module']).split('/').pop();
    });
  }
}
