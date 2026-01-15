import { Routes } from '@angular/router';
import {authGuard} from './services/auth/teacher/auth.guard';
import { StudentLoginHome } from './components/studentLogin/student-login-home/student-login-home';
import { teacherLogin } from './components/teacherLogin/teacherLogin';
import { TeacherOverviewComponent } from './components/teacherView/teacherOverview';
import {TeacherSignupComponent} from './components/teacherSignup/signup';
import {studentAuthGuard} from './services/auth/student/studentAuth.guard';
import {LearningModule} from './components/h5p/binaerer-bob-code/learning-module';

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
];
