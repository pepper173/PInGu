import {
  AfterViewInit,
  Component,
  ElementRef, inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { H5P } from 'h5p-standalone';
import {StudentAuthService} from '../../../auth/student/studentAuth.service';

@Component({
  selector: 'app-learning-module',
  standalone: true,
  templateUrl: './learning-module.html',
  styleUrl: './learning-module.scss',
})
export class LearningModule implements AfterViewInit, OnDestroy {
  @ViewChild('h5pContainer', { static: true })
  private h5pContainer!: ElementRef<HTMLDivElement>;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly studentAuthService = inject(StudentAuthService);

  isLoading = true;
  loadingText = 'Lade Modul…';

  module!: string;
  private observer?: MutationObserver;

  onBack(): void {
    this.router.navigate(['/CLP'], { relativeTo: this.route });
  }

  onLogout(): void {
    this.studentAuthService.logout();
    this.router.navigate(['/login']);
  }

  async ngAfterViewInit() {
    const moduleParam = this.route.snapshot.paramMap.get('module');
    if (!moduleParam) throw new Error('Kein H5P Modul angegeben');

    this.module = decodeURIComponent(moduleParam);

    const options = {
      h5pJsonPath: this.module,
      frameJs:
        'https://cdn.jsdelivr.net/npm/h5p-standalone@latest/dist/frame.bundle.js',
      frameCss:
        'https://cdn.jsdelivr.net/npm/h5p-standalone@latest/dist/styles/h5p.css',
    };

    new H5P(this.h5pContainer.nativeElement, options);
    await this.waitForH5PIframeReady(this.h5pContainer.nativeElement);
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private waitForH5PIframeReady(container: HTMLElement): Promise<void> {
    const already = container.querySelector('iframe');
    if (already) return this.waitForIframeLoad(already as HTMLIFrameElement);

    return new Promise<void>((resolve) => {
      this.observer = new MutationObserver(() => {
        const iframe = container.querySelector('iframe') as HTMLIFrameElement | null;
        if (iframe) {
          this.observer?.disconnect();
          this.waitForIframeLoad(iframe).then(resolve);
        }
      });

      this.observer.observe(container, { childList: true, subtree: true });
    });
  }

  private waitForIframeLoad(iframe: HTMLIFrameElement): Promise<void> {
    try {
      if (iframe.contentDocument?.readyState === 'complete') return Promise.resolve();
    } catch {
      // cross-origin edge cases; usually not an issue here
    }

    return new Promise<void>((resolve) => {
      const done = () => resolve();
      iframe.addEventListener('load', done, { once: true });
      setTimeout(done, 8000);
    });
  }
}
