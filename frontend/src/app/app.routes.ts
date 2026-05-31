import { Routes } from '@angular/router';
import { authGuard } from './services/auth/teacher/auth.guard';
import { studentAuthGuard } from './services/auth/student/studentAuth.guard';
import { StudentLogin } from './components/studentLogin/studentLogin';
import { teacherLogin } from './components/teacherLogin/teacherLogin';
import { TeacherOverviewComponent } from './components/teacherView/teacherOverview';
import { TeacherSignupComponent } from './components/teacherSignup/signup';
import { H5pModuleRoutes } from './components/h5p/h5p-module-routes';
import { Clp } from './components/ChooseLpath/clp';
import {EndScreen} from './components/endScreen/endScreen';
import { CubiLevel } from './components/cubi/cubi-level';
import { CubiFeedback } from './components/cubi-feedback/cubi-feedback';
import { CubiFeedbackSave } from './components/cubi-feedback-save/cubi-feedback-save';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: 'student-login', component: StudentLogin },
  { path: 'teacher-login', component: teacherLogin },
  { path: 'teacher-signup', component: TeacherSignupComponent },
  { path: 'teacher-overview', component: TeacherOverviewComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'student-login' },
  { path: 'CLP', canActivate: [studentAuthGuard], component: Clp },
  { path: 'end-screen', canActivate: [studentAuthGuard], component: EndScreen },
  { path: 'modules/:module', component: H5pModuleRoutes, canActivate: [studentAuthGuard] },
  { path: 'cubi-level/:levelId', component: CubiLevel, canActivate: [studentAuthGuard] },
  { path: 'cubi-feedback/:levelId', component: CubiFeedback },
  { path: 'cubi-feedback-save/:levelId', component: CubiFeedbackSave, canActivate: [studentAuthGuard] },
  { path: '**', component: NotFound },
];
