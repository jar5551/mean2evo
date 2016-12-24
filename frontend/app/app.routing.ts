/**
 * Created by jarek on 26/11/2016.
 */
import {Routes} from '@angular/router';

import {PostsComponent} from './components/posts/posts.component';
import {AdminComponent} from './components/admin/admin.component';
import {AdminLoginComponent} from './components/admin/admin-login/admin-login.component';
import { ClientHomeComponent } from './components/client/client-home/client-home.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: ClientHomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'login',
        component: AdminLoginComponent
      }
    ]
  }
  //{ path: '**', component: PageNotFoundComponent }
];