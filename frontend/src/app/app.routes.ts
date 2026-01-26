import { Routes } from '@angular/router';
import {authGuard} from './services/auth/teacher/auth.guard';
import { StudentLoginHome } from './components/studentLogin/student-login-home/student-login-home';
import { teacherLogin } from './components/teacherLogin/teacherLogin';
import { TeacherOverviewComponent } from './components/teacherView/teacherOverview';
import {TeacherSignupComponent} from './components/teacherSignup/signup';
import {studentAuthGuard} from './services/auth/student/studentAuth.guard';
import {LearningModulesRoute} from './components/h5p/learning-modules-route';

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
  { path: 'modules/:module', component: LearningModulesRoute, canActivate: [studentAuthGuard] },
];
