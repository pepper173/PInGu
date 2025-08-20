import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLoginHeader } from './student-login-header';

describe('StudentLoginHeader', () => {
  let component: StudentLoginHeader;
  let fixture: ComponentFixture<StudentLoginHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLoginHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLoginHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
