import {inject, Injectable, OnDestroy} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

export interface H5PModuleState {
  contentId: string;
  moduleState: JSON;
}

@Injectable({ providedIn: 'root' })
export class H5pAutoSaveService implements OnDestroy {
  private sub?: Subscription;

  start(contentId: string, saveFreqSeconds: number, saveFn: () => void) {
    this.stop();
    this.sub = interval(saveFreqSeconds * 1000).subscribe(saveFn);
  }

  stop() {
    this.sub?.unsubscribe();
    this.sub = undefined;
  }

  ngOnDestroy() {
    this.stop();
  }
}

@Injectable({ providedIn: 'root' })
export class H5pStorageService {
  private readonly baseUrl: string = environment.apiUrl+"h5p";
  private http: HttpClient = inject(HttpClient);

  getLastH5PModuleState(contentId: string) {
    return this.http.get<H5PModuleState>(`${this.baseUrl}/module/${contentId}`);
  }

  saveLastH5PModuleState(contentId: string, state: JSON) {
    return this.http.post(`${this.baseUrl}/module`, {contentId, state});
  }
}

@Injectable({ providedIn: 'root' })
export class H5pResultService {
  private readonly baseUrl: string = environment.apiUrl+"h5p";
  private http: HttpClient = inject(HttpClient);

  saveH5PResult(contentId: string, subContentId: string, resultData: JSON) {
    return this.http.post(`${this.baseUrl}/module/result`, {contentId, subContentId, resultData});
  }
}
