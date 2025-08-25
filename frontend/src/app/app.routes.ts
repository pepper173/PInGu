import { Routes } from '@angular/router';
import { StudentLoginHome } from './components/studentLogin/student-login-home/student-login-home';

export const routes: Routes = [
  { path: '', component: StudentLoginHome }, // Startseite
  {
    path: 'clp',
    loadComponent: () =>
      import('./components/ChooseLpath/clphome/clphome').then(m => m.CLPHome),
  },
];