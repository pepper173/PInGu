import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLoginHome } from './student-login-home';

describe('StudentLoginHome', () => {
  let component: StudentLoginHome;
  let fixture: ComponentFixture<StudentLoginHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLoginHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLoginHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
