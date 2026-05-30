import { Component, EventEmitter, Output } from '@angular/core';

export type LayerItem = { id: string; label: string };

@Component({
  selector: 'app-clp-layer-selection',
  standalone: true,
  templateUrl: './clp-layer-selection.html',
  styleUrls: ['./clp-layer-selection.scss'],
})
export class ClpLayerSelection {
  @Output() selectLP1 = new EventEmitter<void>();
  @Output() selectLP2 = new EventEmitter<void>();
  @Output() selectLP3 = new EventEmitter<void>();

  onSelectLP1() {
    this.selectLP1.emit();
  }

  onSelectLP2() {
    this.selectLP2.emit();
  }

  onSelectLP3() {
    this.selectLP3.emit();
  }
}
