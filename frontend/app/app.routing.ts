/**
 * Created by jarek on 26/11/2016.
 */
import {Routes} from '@angular/router';

import {PostsComponent} from './components/posts/posts.component';
import {AdminComponent} from './components/admin/admin.component';
import {AdminLoginComponent} from './components/admin/admin-login/admin-login.component';
import {AdminDashboardComponent} from './components/admin/admin-dashboard/admin-dashboard.component';
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
      }
    ]
  }
  //{ path: '**', component: PageNotFoundComponent }
];