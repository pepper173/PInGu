import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {TeacherAuthService} from '../../../services/auth/teacher/teacherAuth.service';

@Component({
  selector: 'app-classes-header',
  templateUrl: './header.html',
  standalone: true,
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  private auth = inject(TeacherAuthService);
  @Input() title = `WELCOME ${this.auth.user()?.email}! `;
  @Output() logout = new EventEmitter<void>();

  onLogout(): void {
    this.logout.emit();
  }
}
