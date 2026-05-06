import { Component } from "@angular/core";
import { H5pModuleBase } from "../h5p-module-base";

@Component({
  selector: "app-modul-g-g1",
  standalone: true,
  templateUrl: "../h5p-module.html",
  styleUrls: ["../h5p-module.scss"],
})
export class G1 extends H5pModuleBase {
  override moduleTitle = "Modul A - Kapitel 1";
  override showNavigationButtons = true;
  override showBackButton = false;

  override onNext(): void {
    this.router.navigate(["/CLP"]);
  }
}
