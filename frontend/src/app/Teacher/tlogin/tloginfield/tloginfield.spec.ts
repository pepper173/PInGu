import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tloginfield } from './tloginfield';

describe('Tloginfield', () => {
  let component: Tloginfield;
  let fixture: ComponentFixture<Tloginfield>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tloginfield]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tloginfield);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
