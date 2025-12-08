import { Routes } from '@angular/router';
import { StudentLoginHome } from './components/studentLogin/student-login-home/student-login-home';
import { teacherLogin } from './components/teacherLogin/teacherLogin';
import { TeacherOverviewComponent } from './components/teacherView/teacherOverview';
import { StudentSignupComponent } from './components/studentSignUp/student-singup';
export const routes: Routes = [
  { path: '', component: StudentLoginHome },
  { path:'teacherLogin', component: teacherLogin},
  { path:'teacherOverview', component: TeacherOverviewComponent},
  { path: 'studentSignup', component: StudentSignupComponent},
  {
    path: 'CLP',
    loadComponent: () =>
      import('./components/ChooseLpath/clphome/clphome').then(m => m.CLPHome),
  },
];