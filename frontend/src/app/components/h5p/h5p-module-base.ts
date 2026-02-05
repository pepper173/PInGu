import {AfterViewInit, Directive, ElementRef, inject, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {H5P} from 'h5p-standalone';
import {StudentAuthService} from '../../services/auth/student/studentAuth.service';
import {H5pAutoSaveService, H5pStorageService} from '../../services/data/h5p/h5p.service';
import {firstValueFrom} from 'rxjs';

/**
 * Base class for H5P module components.
 * Provides common functionality for loading, saving, and managing H5P content.
 */
@Directive()
export abstract class H5pModuleBase implements AfterViewInit, OnDestroy {
  @ViewChild('h5pContainer', {static: true})
  protected h5pContainer!: ElementRef<HTMLDivElement>;

  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly studentAuthService = inject(StudentAuthService);
  protected readonly autoSave = inject(H5pAutoSaveService);
  protected readonly h5pStorageService = inject(H5pStorageService);
  protected readonly ngZone = inject(NgZone);

  protected readonly baseUrl = '/modules';

  isLoading = true;
  loadingText = 'Lade Modul…';

  moduleTitle = 'Lernmodul';
  backButtonLabel = 'Home';
  showNavigationButtons = false;
  showBackButton = false;

  private moduleProgress: string = '';
  private observer?: MutationObserver;
  private resizeObserver?: ResizeObserver;
  protected module!: string;

  onBack(): void {
    this.router.navigate(['/CLP']);
  }

  onLogout(): void {
    this.studentAuthService.logout();
    this.router.navigate(['/login']);
  }

  onBackToPrevious(): void {
    // Can be overridden by child components
  }

  onNext(): void {
    // Can be overridden by child components
  }

  async ngAfterViewInit() {
    const moduleParam = this.route.snapshot.paramMap.get('module');
    if (!moduleParam) throw new Error('Kein H5P Modul angegeben');

    this.module = decodeURIComponent(moduleParam);
    const modulePath = this.module;
    const contentIdSuffix = this.module.split('/').pop()!;

    const content_id = `${this.studentAuthService.user().id}-${contentIdSuffix}`;

    await this.retrieveSavedState(content_id);

    const options = {
      id: content_id,
      h5pJsonPath: modulePath,
      frameJs: 'https://cdn.jsdelivr.net/npm/h5p-standalone@latest/dist/frame.bundle.js',
      frameCss: 'https://cdn.jsdelivr.net/npm/h5p-standalone@latest/dist/styles/h5p.css',
      saveFreq: 10, // seconds
      contentUserData: this.moduleProgress ? [
        {
          dataType: 'state',
          state: this.moduleProgress,
          previousState: this.moduleProgress,
        }
      ] : [],
    };

    await new H5P(this.h5pContainer.nativeElement, options);
    await this.waitForH5PIframeReady(this.h5pContainer.nativeElement);

    const iframe = this.h5pContainer.nativeElement.querySelector('iframe') as HTMLIFrameElement | null;
    if (iframe) {
      this.attachIframeAutoHeight(iframe);
    }

    this.isLoading = false;

    this.startAutoSave(options.id, options.saveFreq);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.resizeObserver?.disconnect();
    this.autoSave.stop();
  }

  private async retrieveSavedState(contentId: string) {
    try {
      const res = await firstValueFrom(
        this.h5pStorageService.getLastH5PModuleState(contentId)
      );
      const stateJson = JSON.stringify(res.moduleState);
      if (stateJson && stateJson !== '{}') {
        this.moduleProgress = stateJson;
      }
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
    const contentUserData = window.H5PIntegration?.contents[`cid-${contentId}`]?.contentUserData;
    console.log(contentUserData)
    if (!contentUserData || !contentUserData[0]) return;

    const stateData = contentUserData[0].state;

    if (!stateData) return;

    this.h5pStorageService.saveLastH5PModuleState(contentId, JSON.parse(stateData)).subscribe({
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
      // cross-origin edge cases?
    }
    return new Promise<void>((resolve) => {
      const done = () => resolve();
      iframe.addEventListener('load', done, {once: true});
      setTimeout(done, 8000);
    });
  }

  private attachIframeAutoHeight(iframe: HTMLIFrameElement): void {
    if (typeof ResizeObserver === 'undefined') return;

    this.resizeObserver?.disconnect();

    const doc = iframe.contentDocument;
    if (!doc) return;

    const target = doc.documentElement || doc.body;
    if (!target) return;

    const updateHeight = () => {
      const bodyHeight = doc.body?.scrollHeight ?? 0;
      const docHeight = doc.documentElement?.scrollHeight ?? 0;
      const nextHeight = Math.max(bodyHeight, docHeight);

      if (nextHeight > 0) {
        iframe.style.height = `${nextHeight}px`;
      }
    };

    updateHeight();

    this.resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    this.resizeObserver.observe(target);
  }
}
