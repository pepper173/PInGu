import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StudentAuthService } from '../../services/auth/student/studentAuth.service';
import { CubiLevelContext } from '../../services/data/cubi/cubi-level-context.service';

@Component({
  selector: 'app-cubi-level',
  standalone: true,
  templateUrl: './cubi-level.html',
  styleUrls: ['./cubi-level.scss'],
})
export class CubiLevel implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private authService = inject(StudentAuthService);
  private levelContext = inject(CubiLevelContext);

  levelTitle = 'CUBI Level';
  cubiUrl = '';
  safeUrl!: SafeResourceUrl;
  levelId = '';
  isLoading = true;

  ngOnInit(): void {
    const levelIdParam = this.route.snapshot.paramMap.get('levelId');
    if (!levelIdParam) return;

    this.levelId = levelIdParam;
    this.levelTitle = `CUBI Level ${this.levelId}`;
    this.cubiUrl = this.buildCubiUrl(this.levelId);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.cubiUrl);

    // Store the correct levelId in context — the CUBI editor's navigate_away
    // block may send a wrong levelId, so feedback-save uses this instead
    this.levelContext.currentLevelId = this.levelId;
  }

  ngOnDestroy(): void {
    this.levelContext.currentLevelId = null;
  }

  onIframeLoad(): void {
    this.isLoading = false;
  }

  onBack(): void {
    this.router.navigate(['/CLP']);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/student-login']);
  }

  // Map levelId (1-7) to actual CUBI level codes
  private static readonly LEVEL_CODES: Record<string, string> = {
    '1': '207287',
    '2': '432019',
    '3': '939221',
    '4': '617857',
    '5': '473938',
    '6': '956067',
    '7': '883104',
  };

  private buildCubiUrl(levelId: string): string {
    const baseUrl = 'https://pingu.schule/cubi/';
    const levelCode = CubiLevel.LEVEL_CODES[levelId] || levelId;
    return `${baseUrl}?whiteLabel=pingu&levelCode=${levelCode}`;
  }
}