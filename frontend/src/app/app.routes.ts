import { Routes } from '@angular/router';
import { authGuard } from './services/auth/teacher/auth.guard';
import { studentAuthGuard } from './services/auth/student/studentAuth.guard';
import { StudentLogin } from './components/studentLogin/studentLogin';
import { teacherLogin } from './components/teacherLogin/teacherLogin';
import { TeacherOverviewComponent } from './components/teacherView/teacherOverview';
import { TeacherSignupComponent } from './components/teacherSignup/signup';
import { H5pModuleRoutes } from './components/h5p/h5p-module-routes';

export const routes: Routes = [
  { path: 'student-login', component: StudentLogin },
  { path: 'teacher-login', component: teacherLogin },
  { path: 'teacher-signup', component: TeacherSignupComponent },
  { path: 'teacher-overview', component: TeacherOverviewComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'student-login' },
  {
    path: 'CLP',
    canActivate: [studentAuthGuard],
    loadComponent: () =>
      import('./components/ChooseLpath/clp').then(m => m.Clp),
  },
  { path: 'modules/:module', component: H5pModuleRoutes, canActivate: [studentAuthGuard] },
];
