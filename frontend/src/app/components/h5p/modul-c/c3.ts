import { Component } from "@angular/core";
import { H5pModuleBase } from "../h5p-module-base";

@Component({
  selector: "app-modul-c-c3",
  standalone: true,
  templateUrl: "../h5p-module.html",
  styleUrls: ["../h5p-module.scss"],
})
export class C3 extends H5pModuleBase {
  override moduleTitle = "Modul C - Kapitel 3";
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate([
      this.baseUrl,
      encodeURIComponent("/assets/h5p/C/C2"),
    ]);
  }
  override onNext(): void {
    this.router.navigate(["/CLP"]);
  }
}
