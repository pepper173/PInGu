import { Component, EventEmitter, Input, Output } from '@angular/core';

export type PathItem = { id: string; label: string; url: string };

@Component({
  selector: 'app-clp-display-paths',
  standalone: true,
  templateUrl: './clp-display-paths.html',
  styleUrls: ['./clp-display-paths.scss'],
})
export class ClpDisplayPaths {
  @Input() items: PathItem[] = [
    { id: 'p1', label: 'Text', url: '' },
    { id: 'p2', label: 'Text', url: '' },
    { id: 'p3', label: 'Text', url: '' },
    { id: 'p4', label: 'Text', url: '' },
  ];

  @Output() select = new EventEmitter<PathItem>();

  pick(item: PathItem) { this.select.emit(item); }
}
