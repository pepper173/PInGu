import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tlhome } from './tlhome';

describe('Tlhome', () => {
  let component: Tlhome;
  let fixture: ComponentFixture<Tlhome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tlhome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tlhome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
