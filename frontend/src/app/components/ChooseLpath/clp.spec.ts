import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clp } from './clp';

describe('Clp', () => {
  let component: Clp;
  let fixture: ComponentFixture<Clp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Clp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
