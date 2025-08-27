import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLoginPingu } from '../student-login-pingu';

describe('StudentLoginPingu', () => {
  let component: StudentLoginPingu;
  let fixture: ComponentFixture<StudentLoginPingu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLoginPingu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLoginPingu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
