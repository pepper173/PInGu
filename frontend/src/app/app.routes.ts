import { Routes } from '@angular/router';
import {authGuard} from './auth/auth.guard';
import { StudentLoginHome } from './components/studentLogin/student-login-home/student-login-home';
import { teacherLogin } from './components/teacherLogin/teacherLogin';
import { TeacherOverviewComponent } from './components/teacherView/teacherOverview';
import {TeacherSignupComponent} from './components/teacherSignup/signup';

export const routes: Routes = [
  { path: 'studentLogin', component: StudentLoginHome },
  { path: 'teacherLogin', component: teacherLogin},
  { path: 'teacherSignup', component: TeacherSignupComponent},
  { path: 'teacherOverview', component: TeacherOverviewComponent, canMatch: [authGuard]},
  { path: '', pathMatch: 'full', redirectTo: 'teacherLogin' },
  { path: '**', redirectTo: 'teacherLogin' },
  {
    path: 'CLP',
    loadComponent: () =>
      import('./components/ChooseLpath/clphome/clphome').then(m => m.CLPHome),
  },
];
