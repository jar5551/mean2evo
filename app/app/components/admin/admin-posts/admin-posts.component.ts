import {Component, OnInit} from '@angular/core';
import {AdminPostsService} from './admin-posts.service';
import {MdDialog, MdDialogRef} from '@angular/material';
import {AdminPostsFormComponent} from './admin-posts-form.component';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss'],
  providers: [AdminPostsService]
})
export class AdminPostsComponent implements OnInit {

  public posts: Array<any>;
  public loading: boolean = true;

  constructor(private adminPostsService: AdminPostsService,
              public dialog: MdDialog) {
  }

  ngOnInit() {
    this.adminPostsService.getPosts()
      .subscribe(res => {
          console.log(res);
          this.posts = res;
        },
        err => {
          console.log(err);
        },
        () => {
          this.handleCompleteLoading();
        });
  }

  handleCompleteLoading() {
    this.loading = false;
  }

  newPost() {
    console.log('open new post dialog');
    this.dialog.open(AdminPostsFormComponent);


    let dialogRef = this.dialog.open(AdminPostsFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    });
  }

}
