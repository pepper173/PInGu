import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CLPHeader } from '../clp-header/clp-header';
import { ClpDisplayPaths, PathItem } from '../clp-display-paths/clp-display-paths';
import { SiteHeader } from '../../site-header/site-header';

@Component({
  selector: 'app-clphome',
  standalone: true,
  imports: [SiteHeader,CLPHeader, ClpDisplayPaths],
  templateUrl: './clphome.html',
  styleUrls: ['./clphome.scss'],
})
export class CLPHome {
  constructor(private router: Router) {}

  // Beispiel: dynamische Labels möglich – sonst übernehmen die Platzhalter
  

  onLogout() {
    // TODO: Session/Cookies löschen, dann zurück zur Login-Route
    this.router.navigate(['/']); // oder z. B. '/login'
  }

  onPick(item: PathItem) {
    // TODO: Weiterleitung in den jeweiligen Lernpfad
    // this.router.navigate(['/pfad', item.id]);
    console.log('Lernpfad gewählt:', item);
  }
}
