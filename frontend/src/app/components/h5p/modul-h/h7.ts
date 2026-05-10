import { Component } from "@angular/core";
import { H5pModuleBase } from "../h5p-module-base";

@Component({
  selector: "app-modul-h-h7",
  standalone: true,
  templateUrl: "../h5p-module.html",
  styleUrls: ["../h5p-module.scss"],
})
export class H7 extends H5pModuleBase {
  override moduleTitle = "Modul B - Kapitel 7";
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate([
      this.baseUrl,
      encodeURIComponent("/assets/h5p/H/H6"),
    ]);
  }

  override onNext(): void {
    this.router.navigate([
      this.baseUrl,
      encodeURIComponent("/assets/h5p/H/H8"),
    ]);
  }
}
