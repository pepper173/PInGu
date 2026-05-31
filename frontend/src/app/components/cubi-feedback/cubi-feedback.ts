import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CubiLevelContext } from '../../services/data/cubi/cubi-level-context.service';

/**
 * Displayed inside the CUBI IFrame — shows only the 3 smileys.
 * On click, navigates the TOP browser window to the save page.
 * No auth/cookie access needed here since we're in a cross-origin iframe.
 */
@Component({
  selector: 'app-cubi-feedback',
  standalone: true,
  templateUrl: './cubi-feedback.html',
  styleUrls: ['./cubi-feedback.scss'],
})
export class CubiFeedback implements OnInit {
  private route = inject(ActivatedRoute);
  private levelContext = inject(CubiLevelContext);

  levelId = '';

  ngOnInit(): void {
    this.levelId = this.route.snapshot.paramMap.get('levelId') || '';
  }

  onRating(rating: 'happy' | 'neutral' | 'sad'): void {
    // Use the correct levelId from context, not from the (potentially wrong) URL
    const levelId = this.levelContext.currentLevelId || this.levelId;
    const baseUrl = window.top?.location.origin || window.location.origin;
    const url = `${baseUrl}/cubi-feedback-save/${levelId}?rating=${rating}`;
    if (window.top) {
      window.top.location.href = url;
    } else {
      window.location.href = url;
    }
  }
}