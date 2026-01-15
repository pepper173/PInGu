import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { CLPHeader } from '../clp-header/clp-header';
import { ClpDisplayPaths, PathItem } from '../clp-display-paths/clp-display-paths';
import {StudentAuthService} from '../../../services/auth/student/studentAuth.service';

@Component({
  selector: 'app-clphome',
  standalone: true,
  imports: [CLPHeader, ClpDisplayPaths],
  templateUrl: './clphome.html',
  styleUrls: ['./clphome.scss'],
})
export class CLPHome {
  private auth = inject(StudentAuthService);
  constructor(private router: Router) {}

  paths: PathItem[] = [
    { id: 'p1', label: 'Sensoren als Datensammler', url: '' },
    { id: 'p2', label: 'Sprache der Computer', url: '/assets/h5p/binaerer-bob-code' },
    { id: 'p3', label: 'Digitale Zeitreise', url: 'digitale-zeitreisen/C1' },
    { id: 'p4', label: 'Freizeitbeschäftigung - digital und analog', url: '' },
  ];

  onLogout() {
    this.auth.logout();
  }

  onPick(item: PathItem) {
    console.log('Lernpfad gewählt:', item);
    if (item.url) {
      // Check if it's a direct route (digitale-zeitreisen) or H5P module path
      if (item.url.startsWith('digitale-zeitreisen')) {
        this.router.navigate(['/' + item.url]);
      } else {
        this.router.navigate([
          '/learning-module',
          encodeURIComponent(item.url),
        ]);
      }
    }
  }
}
