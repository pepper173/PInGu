import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlHeader } from './tlheader';

describe('Tlheader', () => {
  let component: TlHeader;
  let fixture: ComponentFixture<TlHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TlHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TlHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
