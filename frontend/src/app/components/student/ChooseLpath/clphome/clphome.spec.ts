import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLPHome } from './clphome';

describe('CLPHome', () => {
  let component: CLPHome;
  let fixture: ComponentFixture<CLPHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CLPHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CLPHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
