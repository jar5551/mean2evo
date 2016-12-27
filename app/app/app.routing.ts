/**
 * Created by jarek on 26/11/2016.
 */
import {Routes} from '@angular/router';

import {AdminComponent} from './components/admin/admin.component';
import {AdminLoginComponent} from './components/admin/admin-login/admin-login.component';
import {AdminDashboardComponent} from './components/admin/admin-dashboard/admin-dashboard.component';
import {AdminPostsComponent} from './components/admin/admin-posts/admin-posts.component';
import {AdminUsersComponent} from './components/admin/admin-users/admin-users.component';

import {ClientHomeComponent} from './components/client/client-home/client-home.component';

import {AuthGuardService} from './services/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: '',
    component: ClientHomeComponent
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    //canActivate: [AuthGuardService],
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'posts',
        component: AdminPostsComponent
      },
      {
        path: 'users',
        component: AdminUsersComponent
      }
    ]
  }
  //{ path: '**', component: PageNotFoundComponent }
];