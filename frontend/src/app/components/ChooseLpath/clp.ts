import { Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { StudentAuthService } from "../../services/auth/student/studentAuth.service";
import { CLPHeader } from "./clp-header/clp-header";
import {
  ClpDisplayPaths,
  PathItem,
} from "./clp-display-paths/clp-display-paths";
import { ClpLayerSelection } from "./clp-layer-selection/clp-layer-selection";

type Layer = "selection" | "lp1" | "lp2";

@Component({
  selector: "app-clphome",
  standalone: true,
  imports: [CLPHeader, ClpDisplayPaths, ClpLayerSelection],
  templateUrl: "./clp.html",
  styleUrls: ["./clp.scss"],
})
export class Clp {
  private auth = inject(StudentAuthService);
  private router = inject(Router);

  currentLayer = signal<Layer>("selection");

  paths: PathItem[] = [
    { id: "p1", label: "Modul A", url: "/assets/h5p/A/A1" },
    { id: "p2", label: "Modul B", url: "/assets/h5p/B/B1" },
    { id: "p3", label: "Modul C", url: "/assets/h5p/C/C1" },
    { id: "p4", label: "Modul D", url: "/assets/h5p/D/D1" },
    { id: "p4", label: "Modul E", url: "/assets/h5p/E/E1" },
    { id: "p5", label: "Modul F", url: "/assets/h5p/F/F1" },
  ];

  paths2: PathItem[] = [
    { id: "p6", label: "Modul A", url: "/assets/h5p/G/G1" },
    { id: "p7", label: "Modul B", url: "/assets/h5p/H/H1" },
    { id: "p8", label: "Modul D", url: "/assets/h5p/I/I1" },
  ];

  onLogout() {
    this.auth.logout();
  }

  onSelectLP1() {
    this.currentLayer.set("lp1");
  }

  onSelectLP2() {
    this.currentLayer.set("lp2");
  }

  onBackToSelection() {
    this.currentLayer.set("selection");
  }

  onPick(item: PathItem) {
    if (item.url) {
      const navigationExtras = { state: { fromClp: true } };
      this.router.navigate(
        ["/modules", encodeURIComponent(item.url)],
        navigationExtras,
      );
    }
  }
}
