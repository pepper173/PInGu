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

  private buildCubiUrl(levelId: string): string {
    // TODO: Replace with actual CUBI deployment URL once configured
    // The CUBI editor needs to be configured to open a popup to our feedback page
    // on level completion
    const baseUrl = 'https://cubi.it4kids.org'; // placeholder
    const feedbackUrl = encodeURIComponent(
      `${window.location.origin}/cubi-feedback/${levelId}`
    );
    return `${baseUrl}?whiteLabel=pingu&level=${levelId}&onComplete=${feedbackUrl}`;
  }
}