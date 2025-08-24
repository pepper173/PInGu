import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClpDisplayPaths } from './clp-display-paths';

describe('ClpDisplayPaths', () => {
  let component: ClpDisplayPaths;
  let fixture: ComponentFixture<ClpDisplayPaths>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClpDisplayPaths]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClpDisplayPaths);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
