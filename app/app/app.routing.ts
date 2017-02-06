/**
 * Created by jarek on 26/11/2016.
 */
import {Routes} from '@angular/router';

import {AdminComponent} from './admin/components/admin.component';
import {AdminLoginComponent} from './admin/components/admin-login/admin-login.component';
import {AdminDashboardComponent} from './admin/components/admin-dashboard/admin-dashboard.component';
import {AdminPostsComponent} from './admin/components/admin-posts/admin-posts.component';
import {AdminUsersComponent} from './admin/components/admin-users/admin-users.component';

import {ClientHomeComponent} from './client/components/client-home/client-home.component';

import {AuthGuardService} from './services/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
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