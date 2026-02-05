import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { H5pModuleBase } from '../h5p-module-base';

@Component({
  selector: 'app-freizeit-e',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrls: ['../h5p-module.scss'],
})
export class E extends H5pModuleBase implements OnInit, OnDestroy {
  override moduleTitle = 'Freizeitbeschäftigung - Teil 1';
  override showNavigationButtons = true;
  override showBackButton = true;

  private readonly minIndex = 1;
  private readonly maxIndex = 15;
  private routeSubscription?: Subscription;
  private hasInitialized = false;
  private lastModuleParam: string | null = null;

  ngOnInit(): void {
    this.updateModuleTitle();
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const moduleParam = params.get('module');
      if (!this.hasInitialized) {
        this.lastModuleParam = moduleParam;
        return;
      }

      if (moduleParam === this.lastModuleParam) return;

      this.lastModuleParam = moduleParam;
      this.updateModuleTitle();
      void this.reloadModule();
    });
  }

  override async ngAfterViewInit(): Promise<void> {
    await super.ngAfterViewInit();
    this.lastModuleParam = this.route.snapshot.paramMap.get('module');
    this.hasInitialized = true;
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.routeSubscription?.unsubscribe();
  }

  private async reloadModule(): Promise<void> {
    this.isLoading = true;

    this.autoSave.stop();

    if (this.h5pContainer?.nativeElement) {
      this.h5pContainer.nativeElement.innerHTML = '';
    }

    await super.ngAfterViewInit();
  }

  private updateModuleTitle(): void {
    const currentIndex = this.getCurrentIndex();
    this.moduleTitle = `Freizeitbeschäftigung - Teil ${currentIndex}`;
  }

  override onBackToPrevious(): void {
    const currentIndex = this.getCurrentIndex();
    if (currentIndex <= this.minIndex) {
      this.router.navigate(['/CLP']);
      return;
    }

    this.navigateToIndex(currentIndex - 1);
  }

  override onNext(): void {
    const currentIndex = this.getCurrentIndex();
    if (currentIndex >= this.maxIndex) {
      this.router.navigate(['/CLP']);
      return;
    }

    this.navigateToIndex(currentIndex + 1);
  }

  private navigateToIndex(index: number): void {
    const clampedIndex = Math.min(this.maxIndex, Math.max(this.minIndex, index));
    const modulePath = `/assets/h5p/freizeit/E${clampedIndex}`;
    this.router.navigate([this.baseUrl, encodeURIComponent(modulePath)]);
  }

  private getCurrentIndex(): number {
    const moduleParam = this.route.snapshot.paramMap.get('module');
    if (!moduleParam) return this.minIndex;

    const decoded = decodeURIComponent(moduleParam);
    const match = decoded.match(/E(\d+)\b/);
    const parsed = match ? Number(match[1]) : this.minIndex;

    if (Number.isNaN(parsed)) return this.minIndex;

    return Math.min(this.maxIndex, Math.max(this.minIndex, parsed));
  }
}
