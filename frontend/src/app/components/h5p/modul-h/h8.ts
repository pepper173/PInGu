import { Component } from "@angular/core";
import { H5pModuleBase } from "../h5p-module-base";

@Component({
  selector: "app-modul-h-h8",
  standalone: true,
  templateUrl: "../h5p-module.html",
  styleUrls: ["../h5p-module.scss"],
})
export class H8 extends H5pModuleBase {
  override moduleTitle = "Modul B - Kapitel 8";
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate([
      this.baseUrl,
      encodeURIComponent("/assets/h5p/H/H7"),
    ]);
  }

  override onNext(): void {
    this.router.navigate([
      this.baseUrl,
      encodeURIComponent("/assets/h5p/H/H9"),
    ]);
  }
}
