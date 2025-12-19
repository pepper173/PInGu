import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
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

  private h5pInstance: any;

  async ngAfterViewInit() {
    const options = {
      h5pJsonPath: '/assets/h5p/pinguine-in-bobs-einfuhrung-binarsystem',
      frameJs: 'https://cdn.jsdelivr.net/npm/h5p-standalone@latest/dist/frame.bundle.js',
      frameCss: 'https://cdn.jsdelivr.net/npm/h5p-standalone@latest/dist/styles/h5p.css',
    };

    this.h5pInstance = new H5P(this.h5pContainer.nativeElement, options);
  }

  ngOnDestroy() {
    // optional: manche Versionen bieten destroy/remove, je nach lib
    if (this.h5pInstance?.destroy) this.h5pInstance.destroy();
    if (this.h5pInstance?.remove) this.h5pInstance.remove();
  }
}

