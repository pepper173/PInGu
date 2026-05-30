import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StudentAuthService } from '../../services/auth/student/studentAuth.service';

@Component({
  selector: 'app-cubi-level',
  standalone: true,
  templateUrl: './cubi-level.html',
  styleUrls: ['./cubi-level.scss'],
})
export class CubiLevel implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private authService = inject(StudentAuthService);

  levelTitle = 'CUBI Level';
  cubiUrl = '';
  safeUrl!: SafeResourceUrl;
  levelId = '';
  isLoading = true;

  ngOnInit(): void {
    const module = this.route.snapshot.paramMap.get('module');
    if (!module) return;

    // Decode and extract level info from route
    // Route format: /cubi-level/:levelId
    this.levelId = decodeURIComponent(module).split('/').pop()!;

    this.levelTitle = `CUBI Level ${this.levelId}`;
    this.cubiUrl = this.buildCubiUrl(this.levelId);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.cubiUrl);
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
    '2': '749174',
    '3': '939221',
    '4': '617857',
    '5': '473938',
    '6': '069050',
    '7': '498674',
  };

  private buildCubiUrl(levelId: string): string {
    // CUBI editor hosted on pingu.schule — production build with advanced mode OFF
    const baseUrl = 'https://pingu.schule/cubi';
    const levelCode = CubiLevel.LEVEL_CODES[levelId] || levelId;
    const feedbackUrl = encodeURIComponent(
      `${window.location.origin}/cubi-feedback/${levelId}`
    );
    return `${baseUrl}?whiteLabel=pingu&levelCode=${levelCode}&onComplete=${feedbackUrl}`;
  }
}