import {Component, OnInit} from '@angular/core';
import {H5pModuleBase} from '../h5p-module-base';

@Component({
  selector: 'app-freizeit-e',
  standalone: true,
  templateUrl: '../h5p-module.html',
  styleUrl: '../h5p-module.scss',
})
export class E extends H5pModuleBase implements OnInit {
  override moduleTitle = 'Freizeitbeschaeftigung - Teil 1';
  override showNavigationButtons = true;
  override showBackButton = true;

  private readonly minIndex = 1;
  private readonly maxIndex = 15;

  ngOnInit(): void {
    const currentIndex = this.getCurrentIndex();
    this.moduleTitle = `Freizeitbeschaeftigung - Teil ${currentIndex}`;
    this.showBackButton = currentIndex > this.minIndex;
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
