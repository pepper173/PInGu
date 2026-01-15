import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningModule } from './learning-module';

describe('LearningModule', () => {
  let component: LearningModule;
  let fixture: ComponentFixture<LearningModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
