import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-classes-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  @Input() title = 'WELCOME';

  @Output() logout = new EventEmitter<void>();

  onLogout(): void {
    this.logout.emit();
  }
}
