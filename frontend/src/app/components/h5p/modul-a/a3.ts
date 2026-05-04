import { Component } from "@angular/core";
import { H5pModuleBase } from "../h5p-module-base";

@Component({
  selector: "app-modul-a-a3",
  standalone: true,
  templateUrl: "../h5p-module.html",
  styleUrls: ["../h5p-module.scss"],
})
export class A3 extends H5pModuleBase {
  override moduleTitle = "Modul A - Kapitel 3";
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate([
      this.baseUrl,
      encodeURIComponent("/assets/h5p/A/A2"),
    ]);
  }

  override onNext(): void {
    this.router.navigate(["/CLP"]);
  }
}
