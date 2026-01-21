import { Routes } from '@angular/router';
import {authGuard} from './services/auth/teacher/auth.guard';
import { StudentLoginHome } from './components/studentLogin/student-login-home/student-login-home';
import { teacherLogin } from './components/teacherLogin/teacherLogin';
import { TeacherOverviewComponent } from './components/teacherView/teacherOverview';
import {TeacherSignupComponent} from './components/teacherSignup/signup';
import {studentAuthGuard} from './services/auth/student/studentAuth.guard';
import {BinaererBob} from './components/h5p/binaerer-bob-code/binaerer-bob';
import {DigitaleZeitreisenModule} from './components/h5p/digitale-zeitreisen/digitale-zeitreisen-module';

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
      import('./components/ChooseLpath/clp').then(m => m.Clp),
  },
  { path: 'learning-module/:module', component: BinaererBob, canActivate: [studentAuthGuard] },
  { path: 'digitale-zeitreisen/:module', component: DigitaleZeitreisenModule, canActivate: [studentAuthGuard] },
];
