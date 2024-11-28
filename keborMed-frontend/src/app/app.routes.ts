import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings/settings.module').then((m) => m.SettingsModule),
  },
  { path: '**', redirectTo: 'home' }, // Fallback route
];



