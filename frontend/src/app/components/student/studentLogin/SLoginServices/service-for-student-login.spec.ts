import { TestBed } from '@angular/core/testing';
import { serviceforStudentLogin } from './service-for-student-login';

describe('ServiceForStudentLogin', () => {
  let service: serviceforStudentLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(serviceforStudentLogin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
