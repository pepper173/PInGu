import { Routes } from '@angular/router';
import {authGuard} from './services/auth/teacher/auth.guard';
import { StudentLoginHome } from './components/studentLogin/student-login-home/student-login-home';
import { teacherLogin } from './components/teacherLogin/teacherLogin';
import { TeacherOverviewComponent } from './components/teacherView/teacherOverview';
import {TeacherSignupComponent} from './components/teacherSignup/signup';
import {studentAuthGuard} from './services/auth/student/studentAuth.guard';
import {LearningModule} from './components/h5p/binaerer-bob-code/learning-module';
import {DigitaleZeitreisenC1} from './components/h5p/digitale-zeitreisen/C1/c1';
import {DigitaleZeitreisenC2} from './components/h5p/digitale-zeitreisen/C2/c2';
import {DigitaleZeitreisenC3} from './components/h5p/digitale-zeitreisen/C3/c3';

export const routes: Routes = [
  { path: 'student-login', component: StudentLoginHome },
  { path: 'teacher-login', component: teacherLogin},
  { path: 'teacher-signup', component: TeacherSignupComponent},
  { path: 'teacher-overview', component: TeacherOverviewComponent, canActivate: [authGuard]},
  { path: '', pathMatch: 'full', redirectTo: 'student-login' },
  {
    path: 'CLP',
    canActivate: [studentAuthGuard],
    loadComponent: () =>
      import('./components/ChooseLpath/clphome/clphome').then(m => m.CLPHome),
  },
  { path: 'binaerer-bob-code/:module', component: LearningModule, canActivate: [studentAuthGuard] },
  { path: 'digitale-zeitreisen/C1', component: DigitaleZeitreisenC1, canActivate: [studentAuthGuard] },
  { path: 'digitale-zeitreisen/C2', component: DigitaleZeitreisenC2, canActivate: [studentAuthGuard] },
  { path: 'digitale-zeitreisen/C3', component: DigitaleZeitreisenC3, canActivate: [studentAuthGuard] },
];
