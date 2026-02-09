import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StudentAuthService } from '../../services/auth/student/studentAuth.service';
import { CLPHeader } from './clp-header/clp-header';
import { ClpDisplayPaths, PathItem } from './clp-display-paths/clp-display-paths';

@Component({
  selector: 'app-clphome',
  standalone: true,
  imports: [CLPHeader, ClpDisplayPaths],
  templateUrl: './clp.html',
  styleUrls: ['./clp.scss'],
})
export class Clp {
  private auth = inject(StudentAuthService);
  private router = inject(Router);

  paths: PathItem[] = [
    { id: 'p1', label: 'Beginne deine Reise!', url: '/assets/h5p/einfuehrung/A1' },
  ];

  onLogout() {
    this.auth.logout();
  }

  onPick(item: PathItem) {
    console.log('Lernpfad gewählt:', item);
    if (item.url) {
      const navigationExtras = { state: { fromClp: true } };
      if (item.url.includes('digitale-zeitreisen')) {
        this.router.navigate(['/modules', encodeURIComponent(item.url)], navigationExtras);
      } else {
        this.router.navigate(['/modules', encodeURIComponent(item.url)], navigationExtras);
      }
    }
  }
}
