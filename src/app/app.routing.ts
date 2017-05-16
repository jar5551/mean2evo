import {Routes} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MainComponent} from './components/main/main.component';
import {AdminPostsComponent} from './components/admin-posts/admin-posts.component';
import {WinnersComponent} from './components/winners/winners.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'posts',
        component: AdminPostsComponent
      },
      {
        path: 'zwyciezcy',
        component: WinnersComponent
      }
    ]
  },
  {path: '**', redirectTo: '/jednostki'}
];