import { Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { StudentAuthService } from "../../services/auth/student/studentAuth.service";
import { CubiFeedbackService } from "../../services/data/cubi/cubi-feedback.service";
import { CLPHeader } from "./clp-header/clp-header";
import {
  ClpDisplayPaths,
  PathItem,
} from "./clp-display-paths/clp-display-paths";
import { ClpLayerSelection } from "./clp-layer-selection/clp-layer-selection";

type Layer = "selection" | "lp1" | "lp2" | "lp3";

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
  private cubiFeedbackService = inject(CubiFeedbackService);

  currentLayer = signal<Layer>("selection");

  paths: PathItem[] = [
    // { id: "p1", label: "Modul A", url: "/assets/h5p/A/A1" },
    // { id: "p2", label: "Modul B", url: "/assets/h5p/B/B1" },
    // { id: "p3", label: "Modul C", url: "/assets/h5p/C/C1" },
    // { id: "p4", label: "Modul D", url: "/assets/h5p/D/D1" },
    // { id: "p4", label: "Modul E", url: "/assets/h5p/E/E1" },
    // { id: "p5", label: "Modul F", url: "/assets/h5p/F/F1" },
  ];

  paths2: PathItem[] = [
    { id: "p6", label: "Modul A", url: "/assets/h5p/G/G1" },
    { id: "p7", label: "Modul B", url: "/assets/h5p/H/H1" },
    { id: "p8", label: "Modul C", url: "/assets/h5p/I/I1" },
    { id: "p9", label: "Modul D", url: "/assets/h5p/J/J1" },
  ];

  paths3: PathItem[] = [
    { id: "p9", label: "CUBI Lernpfad", url: "/assets/h5p/LP3/B1" },
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

  onSelectLP3() {
    this.currentLayer.set("lp3");
  }

  onPickLP3(item: PathItem) {
    const studentId = this.auth.user()?.id;
    if (!studentId) {
      this.onPick(item);
      return;
    }

    this.cubiFeedbackService.getCompletedLevels(studentId).subscribe({
      next: (result) => {
        const completed = result.completedLevels;
        const nextLevel = this.getNextLevel(completed);
        if (!nextLevel) {
          // No levels completed yet — start from B1
          this.onPick(item);
          return;
        }
        if (nextLevel.h5pUrl) {
          const navigationExtras = { state: { fromClp: true } };
          this.router.navigate(
            ["/modules", encodeURIComponent(nextLevel.h5pUrl)],
            navigationExtras,
          );
        } else {
          // Should not happen — all levels have an h5pUrl now
          this.router.navigate(['/CLP']);
        }
      },
      error: () => {
        this.onPick(item);
      },
    });
  }

  // Map of level progression: each CUBI level completion unlocks the next H5P module
  // Flow: B1 → CUBI 1 → B2 → CUBI 2 → ... → B7 → CUBI 7 → B8 (Endscreen)
  // The key insight: completedLevels contains CUBI levels that are DONE.
  // The student should resume at the H5P module BEFORE the first uncompleted CUBI level.
  // If CUBI 1 is done → resume at B2 (before CUBI 2)
  // If CUBI 1+2 are done → resume at B3 (before CUBI 3)
  private static readonly LEVEL_PROGRESS: { level: string; h5pUrl: string }[] = [
    { level: '1', h5pUrl: '/assets/h5p/LP3/B2' },   // CUBI 1 done → start at B2
    { level: '2', h5pUrl: '/assets/h5p/LP3/B3' },   // CUBI 2 done → start at B3
    { level: '3', h5pUrl: '/assets/h5p/LP3/B4' },   // CUBI 3 done → start at B4
    { level: '4', h5pUrl: '/assets/h5p/LP3/B5' },   // CUBI 4 done → start at B5
    { level: '5', h5pUrl: '/assets/h5p/LP3/B6' },   // CUBI 5 done → start at B6
    { level: '6', h5pUrl: '/assets/h5p/LP3/B7' },   // CUBI 6 done → start at B7
    { level: '7', h5pUrl: '/assets/h5p/LP3/B8' },   // CUBI 7 done → Endscreen B8
  ];

  private getNextLevel(completedLevels: string[]): { level: string; h5pUrl: string } | null {
    // Find the highest completed level, then return the H5P module AFTER it
    // completed = ['1'] → highest is 1 → h5pUrl for level 1 = B2 ✅
    // completed = ['1','2'] → highest is 2 → h5pUrl for level 2 = B3 ✅
    // completed = [] → no levels done → go to B1 (default)
    if (completedLevels.length === 0) {
      return null; // No levels completed, start from B1
    }
    
    // Find the highest completed level
    const maxCompleted = Math.max(...completedLevels.map(Number));
    
    // Look up the corresponding entry
    const entry = Clp.LEVEL_PROGRESS.find(e => e.level === String(maxCompleted));
    return entry || null;
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
