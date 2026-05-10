import { Component } from "@angular/core";
import { H5pModuleBase } from "../h5p-module-base";

@Component({
  selector: "app-modul-h-h17",
  standalone: true,
  templateUrl: "../h5p-module.html",
  styleUrls: ["../h5p-module.scss"],
})
export class H17 extends H5pModuleBase {
  override moduleTitle = "Modul B - Kapitel 17";
  override showNavigationButtons = true;
  override showBackButton = true;

  override onBackToPrevious(): void {
    this.router.navigate([
      this.baseUrl,
      encodeURIComponent("/assets/h5p/H/H16"),
    ]);
  }

  override onNext(): void {
    this.router.navigate([
      this.baseUrl,
      encodeURIComponent("/assets/h5p/H/H18"),
    ]);
  }
}
