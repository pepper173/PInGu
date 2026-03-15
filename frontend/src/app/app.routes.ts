import { Routes } from '@angular/router';
import { authGuard } from './services/auth/teacher/auth.guard';
import { studentAuthGuard } from './services/auth/student/studentAuth.guard';
import { StudentLogin } from './components/studentLogin/studentLogin';
import { teacherLogin } from './components/teacherLogin/teacherLogin';
import { TeacherOverviewComponent } from './components/teacherView/teacherOverview';
import { TeacherSignupComponent } from './components/teacherSignup/signup';
import { Clp } from './components/ChooseLpath/clp';
import {EndScreen} from './components/endScreen/endScreen';
import { H5pModuleBase } from './components/h5p/h5p-module-base';

export const routes: Routes = [
  { path: 'student-login', component: StudentLogin },
  { path: 'teacher-login', component: teacherLogin },
  { path: 'teacher-signup', component: TeacherSignupComponent },
  { path: 'teacher-overview', component: TeacherOverviewComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'student-login' },
  { path: 'CLP', canActivate: [studentAuthGuard], component: Clp },
  { path: 'end-screen', canActivate: [studentAuthGuard], component: EndScreen },
  { path: 'h5p', canActivate: [studentAuthGuard], component: H5pModuleBase },
  // { path: 'modules/:module', component: H5pModuleRoutes, canActivate: [studentAuthGuard] },
];
