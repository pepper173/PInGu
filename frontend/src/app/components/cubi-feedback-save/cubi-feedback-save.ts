import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentAuthService } from '../../services/auth/student/studentAuth.service';
import { CubiFeedbackService } from '../../services/data/cubi/cubi-feedback.service';

// Map of levelId → next H5P module URL
const LEVEL_NEXT_MAP: Record<string, string> = {
  '1': '/assets/h5p/LP3/B2',
  '2': '/assets/h5p/LP3/B3',
  '3': '/assets/h5p/LP3/B4',
  '4': '/assets/h5p/LP3/B5',
  '5': '/assets/h5p/LP3/B6',
  '6': '/assets/h5p/LP3/B7',
  '7': '',
};

/**
 * Buffer page opened in the real browser (not iframe).
 * Reads cookie → knows the user → saves rating → redirects to next module.
 */
@Component({
  selector: 'app-cubi-feedback-save',
  standalone: true,
  templateUrl: './cubi-feedback-save.html',
  styleUrls: ['./cubi-feedback-save.scss'],
})
export class CubiFeedbackSave implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(StudentAuthService);
  private feedbackService = inject(CubiFeedbackService);

  ngOnInit(): void {
    const levelId = this.route.snapshot.paramMap.get('levelId') || '';
    const rating = this.route.snapshot.queryParamMap.get('rating') as 'happy' | 'neutral' | 'sad' | null;

    if (!rating || !['happy', 'neutral', 'sad'].includes(rating)) {
      // Invalid rating — just redirect to CLP
      this.router.navigate(['/CLP']);
      return;
    }

    // CheckAuth is already done by the guard, user should be available
    const studentId = this.authService.user()?.id;

    if (!studentId) {
      // Not logged in — redirect to login
      this.router.navigate(['/student-login']);
      return;
    }

    this.feedbackService.saveFeedback(studentId, levelId, rating).subscribe({
      next: () => this.navigateToNext(levelId),
      error: (err) => {
        console.error('Failed to save CUBI feedback:', err);
        // Still navigate — don't block the student
        this.navigateToNext(levelId);
      },
    });
  }

  private navigateToNext(levelId: string): void {
    const nextUrl = LEVEL_NEXT_MAP[levelId];
    if (!nextUrl) {
      this.router.navigate(['/end-screen']);
      return;
    }
    this.router.navigate(['/modules', encodeURIComponent(nextUrl)]);
  }
}