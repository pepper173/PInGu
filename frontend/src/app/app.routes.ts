import { Routes } from '@angular/router';
import { StudentLoginHome } from './components/student/studentLogin/student-login-home/student-login-home';

export const routes: Routes = [
  { path: '', component: StudentLoginHome }, // Startseite
  {
    path: 'clp',
    loadComponent: () =>
      import('./components/student/ChooseLpath/clphome/clphome').then(m => m.CLPHome),
  },
  {path: 'tl', loadComponent: () => import('./Teacher/tlogin/tlhome/tlhome').then(m => m.TLHome)},
];