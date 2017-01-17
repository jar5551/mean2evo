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
    _id: null,
    title: '',
    content: '',
    author: false,
    isPublic: false
  };

  constructor(public dialogRef: MdDialogRef<AdminPostsFormComponent>,
              private adminPostsService: AdminPostsService) { }

  ngOnInit() {
  }

  okDialog() {
    if(!this.model._id) {
      this.createPost();
    } else {
      this.updatePost();
    }
  }

  closeDialog() {
    this.dialogRef.close({
      status: 'cancel'
    });
  }

  private handleError(err): void {
    console.log(err);
  }

  private createPost() {
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

  private updatePost() {
    this.adminPostsService.updatePost(this.model._id, this.model)
      .subscribe(res => {
        this.dialogRef.close({
          status: 'updated',
          post: res
        });
      }, err => {
        this.handleError(err);
      });
  }


}
