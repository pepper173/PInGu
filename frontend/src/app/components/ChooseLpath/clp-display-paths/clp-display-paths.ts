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
    { id: 'p1', label: '' },
    { id: 'p2', label: 'Test2' },
    { id: 'p3', label: 'Text' },
    { id: 'p4', label: 'Text' },
  ];

  @Output() select = new EventEmitter<PathItem>();

  pick(item: PathItem) { this.select.emit(item); }
}
