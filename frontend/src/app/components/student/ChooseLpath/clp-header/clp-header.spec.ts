import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLPHeader } from './clp-header';

describe('CLPHeader', () => {
  let component: CLPHeader;
  let fixture: ComponentFixture<CLPHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CLPHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CLPHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
