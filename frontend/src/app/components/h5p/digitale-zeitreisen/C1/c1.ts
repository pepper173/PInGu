import {AfterViewInit, Component, ElementRef, inject, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {H5P} from 'h5p-standalone';
import {StudentAuthService} from '../../../../services/auth/student/studentAuth.service';
import {H5pAutoSaveService, H5pStorageService} from '../../../../services/data/h5p/h5p.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-digitale-zeitreisen-c1',
  standalone: true,
  templateUrl: './c1.html',
  styleUrl: './c1.scss',
})
export class DigitaleZeitreisenC1 implements AfterViewInit, OnDestroy {
  @ViewChild('h5pContainer', {static: true})
  private h5pContainer!: ElementRef<HTMLDivElement>;

  private readonly router = inject(Router);
  private readonly studentAuthService = inject(StudentAuthService);
  private readonly autoSave = inject(H5pAutoSaveService);
  private readonly h5pStorageService = inject(H5pStorageService);
  private readonly ngZone = inject(NgZone);

  isLoading = true;
  loadingText = 'Lade Modul…';

  private moduleProgress: string = '';
  private observer?: MutationObserver;

  onBack(): void {
    this.router.navigate(['/CLP']);
  }

  onNext(): void {
    this.router.navigate(['/digitale-zeitreisen/C2']);
  }

  onLogout(): void {
    this.studentAuthService.logout();
    this.router.navigate(['/login']);
  }

  async ngAfterViewInit() {
    const modulePath = '/assets/h5p/digitale-zeitreisen/C1';
    const content_id = `${this.studentAuthService.user().id}-digitale-zeitreisen-C1`;

    await this.retrieveSavedState(content_id);

    const options = {
      id: content_id,
      h5pJsonPath: modulePath,
      frameJs: 'https://cdn.jsdelivr.net/npm/h5p-standalone@latest/dist/frame.bundle.js',
      frameCss: 'https://cdn.jsdelivr.net/npm/h5p-standalone@latest/dist/styles/h5p.css',
      saveFreq: 10,
      contentUserData: [
        {
          dataType: 'state',
          previousState: this.moduleProgress,
        }
      ]
    };

    await new H5P(this.h5pContainer.nativeElement, options);
    await this.waitForH5PIframeReady(this.h5pContainer.nativeElement);
    this.isLoading = false;

    this.startAutoSave(options.id, options.saveFreq);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.autoSave.stop();
  }

  private async retrieveSavedState(contentId: string) {
    try {
      const res = await firstValueFrom(
        this.h5pStorageService.getLastH5PModuleState(contentId)
      );
      this.moduleProgress = JSON.stringify(res.moduleState);
    } catch {
      this.moduleProgress = '';
    }
  }

  private startAutoSave(contentId: string, saveFreqSeconds: number) {
    this.autoSave.stop();
    this.ngZone.runOutsideAngular(() => {
      this.autoSave.start(contentId, saveFreqSeconds, () => this.saveContentState(contentId));
    });
  }

  private saveContentState(contentId: string) {
    if (!window.H5PIntegration?.contents) return;
    const data = window.H5PIntegration?.contents[`cid-${contentId}`]?.contentUserData;

    if (!data) return;

    this.h5pStorageService.saveLastH5PModuleState(contentId, JSON.parse(data[0].previousState)).subscribe({
      next: () => console.log('State saved successfully.'),
    });
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

      this.observer.observe(container, {childList: true, subtree: true});
    });
  }

  private waitForIframeLoad(iframe: HTMLIFrameElement): Promise<void> {
    try {
      if (iframe.contentDocument?.readyState === 'complete') return Promise.resolve();
    } catch {
      // cross-origin edge cases
    }
    return new Promise<void>((resolve) => {
      const done = () => resolve();
      iframe.addEventListener('load', done, {once: true});
      setTimeout(done, 8000);
    });
  }
}

