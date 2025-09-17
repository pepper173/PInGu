import { Component, EventEmitter, Input, Output } from '@angular/core';

export type PathItem = { id: string; label: string };

@Component({
  selector: 'app-clp-display-paths',
  standalone: true,
  templateUrl: './clp-display-paths.html',
  styleUrls: ['./clp-display-paths.scss'],
})
export class ClpDisplayPaths {
  /** Vier Items – Standard mit Platzhalter-Text */
  @Input() items: PathItem[] = [
    { id: 'p1', label: 'Handy, Tablet, Zahnbürste - Wo stecken überall Computer drin?' },
    { id: 'p2', label: 'Apps, Spiele, Algorithmen – Mehr als du siehst!' },
    { id: 'p3', label: 'Liken, Chatten, Scrollen – Was passiert, wenn ich online bin?' },
    { id: 'p4', label: 'Suchmaschinen und KI – Wenn das Netz antwortet!' },
  ];

  @Output() select = new EventEmitter<PathItem>();

  pick(item: PathItem) { this.select.emit(item); }
}
