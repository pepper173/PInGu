import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-clp-header',
  standalone: true,
  templateUrl: './clp-header.html',
  styleUrls: ['./clp-header.scss'],
})
export class CLPHeader {
  @Output() logout = new EventEmitter<void>();
  onLogout() { this.logout.emit(); }
}