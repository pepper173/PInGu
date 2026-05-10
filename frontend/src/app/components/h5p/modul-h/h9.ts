import { Component } from "@angular/core";
import { H5pModuleBase } from "../h5p-module-base";

@Component({
  selector: "app-modul-h-h9",
  standalone: true,
  templateUrl: "../h5p-module.html",
  styleUrls: ["../h5p-module.scss"],
})
export class H9 extends H5pModuleBase {
  override moduleTitle = "Modul B - Kapitel 9";
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate([
      this.baseUrl,
      encodeURIComponent("/assets/h5p/H/H8"),
    ]);
  }

  override onNext(): void {
    this.router.navigate([
      this.baseUrl,
      encodeURIComponent("/assets/h5p/H/H10"),
    ]);
  }
}
