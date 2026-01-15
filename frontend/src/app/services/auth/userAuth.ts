import {Observable} from 'rxjs';
import {Teacher} from './teacher/teacherAuth.model';
import {Student} from './student/studentAuth.model';

abstract class UserAuth {
  abstract login(): Observable<Teacher|Student>;
  abstract logout(): void;
}
