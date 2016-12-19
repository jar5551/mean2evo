import {Component, OnInit} from '@angular/core';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [PostsService]
})
export class PostsComponent implements OnInit {

  private posts: Array<PostsComponent> = [];

  constructor(public postsService:PostsService) {
    console.log('PostsComponent go!');

    postsService.getPosts()
      .subscribe((res) => {
        this.posts = res;
      })
  }

  ngOnInit() {
  }

}
