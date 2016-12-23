/**
 * Created by jarek on 26/11/2016.
 */
import { PostsComponent } from './components/posts/posts.component';

let postsState = {
  name: 'posts',
  url: '/posts',
  component: PostsComponent
};


export const routing = {
  states: [ postsState ],
  useHash: false
};
