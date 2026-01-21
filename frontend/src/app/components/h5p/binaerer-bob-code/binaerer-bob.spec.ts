import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaererBob } from './binaerer-bob';

describe('BinaererBob', () => {
  let component: BinaererBob;
  let fixture: ComponentFixture<BinaererBob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BinaererBob]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinaererBob);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
