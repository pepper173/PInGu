import {AfterViewInit, Component, ElementRef, inject, NgZone, OnDestroy, ViewChild,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {H5P} from 'h5p-standalone';
import {StudentAuthService} from '../../../services/auth/student/studentAuth.service';
import {H5pAutoSaveService, H5pStorageService} from '../../../services/data/h5p/h5p.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-binaerer-bob-code',
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
  private readonly autoSave = inject(H5pAutoSaveService)
  private readonly h5pStorageService = inject(H5pStorageService)
  private readonly ngZone = inject(NgZone)

  isLoading = true;
  loadingText = 'Lade Modul…';

  private moduleProgress: string = 'not loaded yet';

  module!: string;
  private observer?: MutationObserver;

  onBack(): void {
    this.router.navigate(['/CLP']);
  }

  onLogout(): void {
    this.studentAuthService.logout();
    this.router.navigate(['/login']);
  }

  async ngAfterViewInit() {
    const moduleParam = this.route.snapshot.paramMap.get('module');
    if (!moduleParam) throw new Error('Kein H5P Modul angegeben');

    this.module = decodeURIComponent(moduleParam);
    const content_id = `${this.studentAuthService.user().id}-${this.module.split('/').pop()}`;

    await this.retrieveSavedState(content_id);

    console.log(this.moduleProgress);

    const options = {
      id: content_id,
      h5pJsonPath: this.module,
      frameJs:
        'https://cdn.jsdelivr.net/npm/h5p-standalone@latest/dist/frame.bundle.js', //DEV
      frameCss:
        'https://cdn.jsdelivr.net/npm/h5p-standalone@latest/dist/styles/h5p.css', //DEV
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

    this.startAutoSave(options.id, options.saveFreq)
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.autoSave.stop()
  }

  private async retrieveSavedState(contentId: string){
    try {
      const res = await firstValueFrom(
        this.h5pStorageService.getLastH5PModuleState(contentId)
      );
      this.moduleProgress = JSON.stringify(res.moduleState);
    } catch {
      this.moduleProgress = "";
    }
  }

  private startAutoSave(contentId: string, saveFreqSeconds: number) {
    this.autoSave.stop()
    this.ngZone.runOutsideAngular(() =>{
      this.autoSave.start(contentId, saveFreqSeconds, () => this.saveContentState(contentId))
    })
  }

  private saveContentState(contentId: string){
    if (!window.H5PIntegration?.contents) return;
    const data = window.H5PIntegration?.contents[`cid-${contentId}`]?.contentUserData;

    if (!data) return;
    console.log(data[0]);

    this.h5pStorageService.saveLastH5PModuleState(contentId, JSON.parse(data[0].previousState)).subscribe({
      next: () => console.log('State saved successfully.'),
    })
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
