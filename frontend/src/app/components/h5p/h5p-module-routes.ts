import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { A1 } from "./modul-a/a1";
import { A2 } from "./modul-a/a2";
import { A3 } from "./modul-a/a3";
import { B1 } from "./modul-b/b1";
import { B2 } from "./modul-b/b2";
import { B3 } from "./modul-b/b3";
import { B4 } from "./modul-b/b4";
import { B5 } from "./modul-b/b5";
import { B6 } from "./modul-b/b6";
import { B7 } from "./modul-b/b7";
import { C1 } from "./modul-c/c1";
import { C2 } from "./modul-c/c2";
import { C3 } from "./modul-c/c3";
import { D1 } from "./modul-d/d1";
import { D2 } from "./modul-d/d2";
import { D3 } from "./modul-d/d3";
import { D4 } from "./modul-d/d4";
import { D5 } from "./modul-d/d5";
import { D6 } from "./modul-d/d6";
import { D7 } from "./modul-d/d7";
import { D8 } from "./modul-d/d8";
import { D9 } from "./modul-d/d9";
import { D10 } from "./modul-d/d10";
import { D11 } from "./modul-d/d11";
import { D12 } from "./modul-d/d12";
import { D13 } from "./modul-d/d13";
import { D14 } from "./modul-d/d14";
import { E1 } from "./modul-e/e1";
import { E2 } from "./modul-e/e2";
import { E3 } from "./modul-e/e3";
import { E4 } from "./modul-e/e4";
import { E5 } from "./modul-e/e5";
import { E6 } from "./modul-e/e6";
import { E7 } from "./modul-e/e7";
import { E8 } from "./modul-e/e8";
import { E9 } from "./modul-e/e9";
import { E10 } from "./modul-e/e10";
import { E11 } from "./modul-e/e11";
import { E12 } from "./modul-e/e12";
import { E13 } from "./modul-e/e13";
import { E14 } from "./modul-e/e14";
import { E15 } from "./modul-e/e15";
import { E16 } from "./modul-e/e16";
import { F1 } from "./modul-f/f1";
import { F2 } from "./modul-f/f2";
import { F3 } from "./modul-f/f3";
import { F4 } from "./modul-f/f4";
import { G1 } from "./modul-g/g1";
import { H1 } from "./modul-h/h1";
import { H2 } from "./modul-h/h2";
import { H3 } from "./modul-h/h3";
import { H4 } from "./modul-h/h4";
import { H5 } from "./modul-h/h5";
import { H6 } from "./modul-h/h6";
import { H7 } from "./modul-h/h7";
import { H8 } from "./modul-h/h8";
import { H9 } from "./modul-h/h9";
import { H10 } from "./modul-h/h10";
import { H11 } from "./modul-h/h11";
import { H12 } from "./modul-h/h12";
import { H13 } from "./modul-h/h13";
import { H14 } from "./modul-h/h14";
import { H15 } from "./modul-h/h15";
import { H16 } from "./modul-h/h16";
import { H17 } from "./modul-h/h17";
import { H18 } from "./modul-h/h18";
import { H19 } from "./modul-h/h19";
import { H20 } from "./modul-h/h20";
import { I1 } from "./modul-i/i1";
import { I2 } from "./modul-i/i2";
import { I3 } from "./modul-i/i3";

@Component({
  selector: "app-h5p-module-routes",
  standalone: true,
  imports: [
    A1,
    A2,
    A3,
    B1,
    B2,
    B3,
    B4,
    B5,
    B6,
    B7,
    C1,
    C2,
    C3,
    D1,
    D2,
    D3,
    D4,
    D5,
    D6,
    D7,
    D8,
    D9,
    D10,
    D11,
    D12,
    D13,
    D14,
    E1,
    E2,
    E3,
    E4,
    E5,
    E6,
    E7,
    E8,
    E9,
    E10,
    E11,
    E12,
    E13,
    E14,
    E15,
    E16,
    F1,
    F2,
    F3,
    F4,
    G1,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    H7,
    H8,
    H9,
    H10,
    H11,
    H12,
    H13,
    H14,
    H15,
    H16,
    H17,
    H18,
    H19,
    H20,
    I1,
    I2,
    I3,
  ],
  template: `
    @switch (module) {
      @case ("A1") {
        <app-modul-a-a1></app-modul-a-a1>
      }
      @case ("A2") {
        <app-modul-a-a2></app-modul-a-a2>
      }
      @case ("A3") {
        <app-modul-a-a3></app-modul-a-a3>
      }
      @case ("B1") {
        <app-modul-b-b1></app-modul-b-b1>
      }
      @case ("B2") {
        <app-modul-b-b2></app-modul-b-b2>
      }
      @case ("B3") {
        <app-modul-b-b3></app-modul-b-b3>
      }
      @case ("B4") {
        <app-modul-b-b4></app-modul-b-b4>
      }
      @case ("B5") {
        <app-modul-b-b5></app-modul-b-b5>
      }
      @case ("B6") {
        <app-modul-b-b6></app-modul-b-b6>
      }
      @case ("B7") {
        <app-modul-b-b7></app-modul-b-b7>
      }
      @case ("C1") {
        <app-modul-c-c1></app-modul-c-c1>
      }
      @case ("C2") {
        <app-modul-c-c2></app-modul-c-c2>
      }
      @case ("C3") {
        <app-modul-c-c3></app-modul-c-c3>
      }
      @case ("D1") {
        <app-modul-d-d1></app-modul-d-d1>
      }
      @case ("D2") {
        <app-modul-d-d2></app-modul-d-d2>
      }
      @case ("D3") {
        <app-modul-d-d3></app-modul-d-d3>
      }
      @case ("D4") {
        <app-modul-d-d4></app-modul-d-d4>
      }
      @case ("D5") {
        <app-modul-d-d5></app-modul-d-d5>
      }
      @case ("D6") {
        <app-modul-d-d6></app-modul-d-d6>
      }
      @case ("D7") {
        <app-modul-d-d7></app-modul-d-d7>
      }
      @case ("D8") {
        <app-modul-d-d8></app-modul-d-d8>
      }
      @case ("D9") {
        <app-modul-d-d9></app-modul-d-d9>
      }
      @case ("D10") {
        <app-modul-d-d10></app-modul-d-d10>
      }
      @case ("D11") {
        <app-modul-d-d11></app-modul-d-d11>
      }
      @case ("D12") {
        <app-modul-d-d12></app-modul-d-d12>
      }
      @case ("D13") {
        <app-modul-d-d13></app-modul-d-d13>
      }
      @case ("D14") {
        <app-modul-d-d14></app-modul-d-d14>
      }
      @case ("E1") {
        <app-modul-e-e1></app-modul-e-e1>
      }
      @case ("E2") {
        <app-modul-e-e2></app-modul-e-e2>
      }
      @case ("E3") {
        <app-modul-e-e3></app-modul-e-e3>
      }
      @case ("E4") {
        <app-modul-e-e4></app-modul-e-e4>
      }
      @case ("E5") {
        <app-modul-e-e5></app-modul-e-e5>
      }
      @case ("E6") {
        <app-modul-e-e6></app-modul-e-e6>
      }
      @case ("E7") {
        <app-modul-e-e7></app-modul-e-e7>
      }
      @case ("E8") {
        <app-modul-e-e8></app-modul-e-e8>
      }
      @case ("E9") {
        <app-modul-e-e9></app-modul-e-e9>
      }
      @case ("E10") {
        <app-modul-e-e10></app-modul-e-e10>
      }
      @case ("E11") {
        <app-modul-e-e11></app-modul-e-e11>
      }
      @case ("E12") {
        <app-modul-e-e12></app-modul-e-e12>
      }
      @case ("E13") {
        <app-modul-e-e13></app-modul-e-e13>
      }
      @case ("E14") {
        <app-modul-e-e14></app-modul-e-e14>
      }
      @case ("E15") {
        <app-modul-e-e15></app-modul-e-e15>
      }
      @case ("E16") {
        <app-modul-e-e16></app-modul-e-e16>
      }
      @case ("F1") {
        <app-modul-f-f1></app-modul-f-f1>
      }
      @case ("F2") {
        <app-modul-f-f2></app-modul-f-f2>
      }
      @case ("F3") {
        <app-modul-f-f3></app-modul-f-f3>
      }
      @case ("F4") {
        <app-modul-f-f4></app-modul-f-f4>
      }
      @case ("G1") {
        <app-modul-g-g1></app-modul-g-g1>
      }
      @case ("H1") {
        <app-modul-h-h1></app-modul-h-h1>
      }
      @case ("H2") {
        <app-modul-h-h2></app-modul-h-h2>
      }
      @case ("H3") {
        <app-modul-h-h3></app-modul-h-h3>
      }
      @case ("H4") {
        <app-modul-h-h4></app-modul-h-h4>
      }
      @case ("H5") {
        <app-modul-h-h5></app-modul-h-h5>
      }
      @case ("H6") {
        <app-modul-h-h6></app-modul-h-h6>
      }
      @case ("H7") {
        <app-modul-h-h7></app-modul-h-h7>
      }
      @case ("H8") {
        <app-modul-h-h8></app-modul-h-h8>
      }
      @case ("H9") {
        <app-modul-h-h9></app-modul-h-h9>
      }
      @case ("H10") {
        <app-modul-h-h10></app-modul-h-h10>
      }
      @case ("H11") {
        <app-modul-h-h11></app-modul-h-h11>
      }
      @case ("H12") {
        <app-modul-h-h12></app-modul-h-h12>
      }
      @case ("H13") {
        <app-modul-h-h13></app-modul-h-h13>
      }
      @case ("H14") {
        <app-modul-h-h14></app-modul-h-h14>
      }
      @case ("H15") {
        <app-modul-h-h15></app-modul-h-h15>
      }
      @case ("H16") {
        <app-modul-h-h16></app-modul-h-h16>
      }
      @case ("H17") {
        <app-modul-h-h17></app-modul-h-h17>
      }
      @case ("H18") {
        <app-modul-h-h18></app-modul-h-h18>
      }
      @case ("H19") {
        <app-modul-h-h19></app-modul-h-h19>
      }
      @case ("H20") {
        <app-modul-h-h20></app-modul-h-h20>
      }
      @case ("I1") {
        <app-modul-i-i1></app-modul-i-i1>
      }
      @case ("I2") {
        <app-modul-i-i2></app-modul-i-i2>
      }
      @case ("I3") {
        <app-modul-i-i3></app-modul-i-i3>
      }
      @default {
        <p style="color: red;">NO MATCH for: {{ module }}</p>
      }
    }
  `,
})
export class H5pModuleRoutes implements OnInit {
  private route = inject(ActivatedRoute);
  module: string = "";

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.module = decodeURIComponent(params["module"]).split("/").pop();
    });
  }
}
