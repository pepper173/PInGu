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
  ];
  @Input() showBackButton = false;

  @Output() select = new EventEmitter<PathItem>();
  @Output() back = new EventEmitter<void>();

  pick(item: PathItem) { this.select.emit(item); }
  
  onBack() { this.back.emit(); }
}
