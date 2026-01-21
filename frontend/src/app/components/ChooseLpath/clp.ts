import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { CLPHeader } from './clp-header/clp-header';
import { ClpDisplayPaths, PathItem } from './clp-display-paths/clp-display-paths';
import {StudentAuthService} from '../../services/auth/student/studentAuth.service';

@Component({
  selector: 'app-clphome',
  standalone: true,
  imports: [CLPHeader, ClpDisplayPaths],
  templateUrl: './clp.html',
  styleUrls: ['./clp.scss'],
})
export class Clp {
  private auth = inject(StudentAuthService);
  constructor(private router: Router) {}

  paths: PathItem[] = [
    { id: 'p1', label: 'Sensoren als Datensammler', url: '' },
    { id: 'p2', label: 'Sprache der Computer', url: '/assets/h5p/binaerer-bob-code' },
    { id: 'p3', label: 'Digitale Zeitreise', url: '/assets/h5p/digitale-zeitreisen/C1' },
    { id: 'p4', label: 'Freizeitbeschäftigung - digital und analog', url: '' },
  ];

  onLogout() {
    this.auth.logout();
  }

  onPick(item: PathItem) {
    console.log('Lernpfad gewählt:', item);
    if (item.url) {
      if (item.url.includes('digitale-zeitreisen')) {
        this.router.navigate(['/digitale-zeitreisen', encodeURIComponent(item.url)]);
      } else {
        this.router.navigate(['/learning-module', encodeURIComponent(item.url),]);
      }
    }
  }
}
