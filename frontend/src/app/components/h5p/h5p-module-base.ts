import {AfterViewInit, Directive, ElementRef, inject, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {H5P} from 'h5p-standalone';
import {StudentAuthService} from '../../services/auth/student/studentAuth.service';
import {H5pAutoSaveService, H5pResultService, H5pStorageService} from '../../services/data/h5p/h5p.service';
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
  protected readonly h5pResultService = inject(H5pResultService);

  protected readonly baseUrl = '/modules';
  protected readonly introDurationMs = 3000;

  isLoading = true;
  loadingText = 'Lade Modul…';
  showIntroOverlay = false;

  moduleTitle = 'Lernmodul';
  backButtonLabel = 'Home';
  showNavigationButtons = false;
  showBackButton = false;
  showNextButton = true;

  /** Override this in subclasses that need a different H5P path than the route param. */
  protected h5pPathOverride?: string;

  private moduleProgress: string = '';
  private observer?: MutationObserver;
  private externalDispatcherBound = false;
  private externalDispatcherHandler?: (event: unknown) => void;
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
    this.showIntroOverlay = this.didNavigateFromClp();
    const introDelay = this.showIntroOverlay ? this.waitForIntroDelay() : Promise.resolve();
    const moduleParam = this.route.snapshot.paramMap.get('module');
    if (!moduleParam) throw new Error('Kein H5P Modul angegeben');

    this.module = decodeURIComponent(moduleParam);
    const modulePath = this.h5pPathOverride ?? this.module;
    const contentIdSuffix = this.module;

    const content_id = `${this.studentAuthService.user().id}-${contentIdSuffix}`;

    await this.retrieveSavedState(content_id);

    const options = {
      id: content_id,
      h5pJsonPath: modulePath,
      frameJs: '/h5p-standalone/frame.bundle.js',
      frameCss: '/h5p-standalone/styles/h5p.css',
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
    await introDelay;
    
    this.isLoading = false;
    
    this.attachExternalDispatcher(content_id);
    this.startAutoSave(options.id, options.saveFreq);
  }

  ngOnDestroy() {
    this.detachExternalDispatcher();
    this.observer?.disconnect();
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

  private attachExternalDispatcher(content_id: string): void {
    if (this.externalDispatcherBound) return;
    const dispatcher = window.H5P?.externalDispatcher;
    if (!dispatcher) return;

    this.externalDispatcherHandler = (event: unknown) => {
      if ((event as any)?.data?.statement?.result) {
        const eventData = (event as any).data;
        const subContentId = new URL(eventData.statement.object.id).searchParams.get('subContentId');
        this.h5pResultService.saveH5PResult(content_id, subContentId, eventData.statement.result).subscribe({
          next: () => console.log('xAPI result saved'),
          error: (err) => console.error('Failed to save xAPI result:', err),
        });
      }
    };

    dispatcher.on('xAPI', this.externalDispatcherHandler);
    this.externalDispatcherBound = true;
  }

  private detachExternalDispatcher(): void {
    const dispatcher = window.H5P?.externalDispatcher;
    if (!dispatcher?.off || !this.externalDispatcherHandler) return;

    dispatcher.off('xAPI', this.externalDispatcherHandler);
    this.externalDispatcherHandler = undefined;
    this.externalDispatcherBound = false;
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

  private didNavigateFromClp(): boolean {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    const state = navigationState ?? history.state;
    return state?.fromClp === true;
  }

  private waitForIntroDelay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, this.introDurationMs);
    });
  }
}
