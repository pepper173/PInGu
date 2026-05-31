import { Injectable } from '@angular/core';

/**
 * Stores the currently active CUBI level ID.
 * The CUBI editor's navigate_away block uses a hardcoded levelId in the URL,
 * which may not match the actual level being played.
 * This service provides the correct levelId from the PInGu route.
 */
@Injectable({ providedIn: 'root' })
export class CubiLevelContext {
  private _currentLevelId: string | null = null;

  set currentLevelId(id: string | null) {
    this._currentLevelId = id;
  }

  get currentLevelId(): string | null {
    return this._currentLevelId;
  }
}