import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import {AdminPostsService} from './admin-posts.service';

@Component({
  selector: 'app-admin-posts-form',
  templateUrl: './admin-posts-form.component.html',
  styleUrls: ['./admin-posts-form.component.scss'],
  providers: [AdminPostsService]
})
export class AdminPostsFormComponent {

  public data = {
    title: '',
    buttons: {}
  };

  public model = {
    title: '',
    content: '',
    isPublic: ''
  };

  constructor(public dialogRef: MdDialogRef<AdminPostsFormComponent>, private adminPostsService: AdminPostsService) { }

  ngOnInit() {
  }

  createPost() {
    console.log('createPost');
    this.adminPostsService.createPost(this.model)
      .subscribe(
        res => {
          this.dialogRef.close({
            status: 'created',
            post: res
          });
        },
        err => {
          this.handleError(err);
        }
      );
  }

  closeDialog() {
    this.dialogRef.close({
      status: 'cancel'
    });
  }

  handleError(err): void {
    console.log(err);
  }


}
