import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { H5P } from 'h5p-standalone';

@Component({
  selector: 'app-learning-module',
  standalone: true,
  templateUrl: './learning-module.html',
  styleUrl: './learning-module.scss',
})
export class LearningModule implements AfterViewInit, OnDestroy {
  @ViewChild('h5pContainer', { static: true })
  private h5pContainer!: ElementRef<HTMLDivElement>;

  isLoading = true;
  loadingText = 'Lade Modul…';

  module!: string;
  private h5pInstance: any;

  private observer?: MutationObserver;

  constructor(private route: ActivatedRoute) {}

  async ngAfterViewInit() {
    try {
      this.isLoading = true;

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

      this.h5pInstance = new H5P(this.h5pContainer.nativeElement, options);

      // Hide overlay when H5P iframe is actually ready
      await this.waitForH5PIframeReady(this.h5pContainer.nativeElement);
      this.isLoading = false;
    } catch (e) {
      console.error(e);
      this.loadingText = 'Fehler beim Laden des Moduls';
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    // If h5p-standalone exposes a destroy API in your version, call it here.
    // (Not always available depending on version/content type.)
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
