import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-site-header',
  standalone: true,
  templateUrl: './site-header.html',
  styleUrls: ['./site-header.scss']
})
export class SiteHeader {
  /** Optionaler Titel */
  @Input() title?: string;

  /** Logout-Event für Elternkomponenten */
  @Output() logout = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }
}