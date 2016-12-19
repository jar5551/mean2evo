/**
 * Created by jarek on 26/11/2016.
 */
import {Routes, RouterModule, CanActivate} from '@angular/router';

import { PostsComponent } from './components/posts/posts.component';

const appRoutes: Routes = [
  {
    path: '',
    component: PostsComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [PostsComponent];