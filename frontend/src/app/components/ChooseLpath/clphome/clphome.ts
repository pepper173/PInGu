import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CLPHeader } from '../clp-header/clp-header';
import { ClpDisplayPaths, PathItem } from '../clp-display-paths/clp-display-paths';

@Component({
  selector: 'app-clphome',
  standalone: true,
  imports: [CLPHeader, ClpDisplayPaths],
  templateUrl: './clphome.html',
  styleUrls: ['./clphome.scss'],
})
export class CLPHome {
  constructor(private router: Router) {}

  // Beispiel: dynamische Labels möglich – sonst übernehmen die Platzhalter
  paths: PathItem[] = [
    { id: 'p1', label: 'Handy, tablet, Zahnbürste. Wo stecken überall Computer drin?' },
    { id: 'p2', label: 'Text' },
    { id: 'p3', label: 'Text' },
    { id: 'p4', label: 'Text' },
  ];

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
