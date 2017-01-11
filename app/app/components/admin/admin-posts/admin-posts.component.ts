import {Component, OnInit} from '@angular/core';
import {AdminPostsService} from './admin-posts.service';
import {MdDialog, MdSnackBar} from '@angular/material';
import {AdminPostsFormComponent} from './admin-posts-form.component';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss'],
  providers: [AdminPostsService]
})

export class AdminPostsComponent implements OnInit {

  public items: Array<any>;
  public loading: boolean = true;
  public templateConfig: Object;

  constructor(private adminPostsService: AdminPostsService,
              public dialog: MdDialog,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.templateConfig = {
      title: 'Posts',
      icon: 'note'
    };

    this.adminPostsService.getPosts()
      .subscribe(
        res => {
          this.items = res;
          this.handleCompleteLoading();
        },
        err => {
          console.log(err);
          this.handleCompleteLoading();
        });

  }

  handleCompleteLoading() {
    this.loading = false;
  }

  newPost() {
    let data = {
      title: 'Add new post',
      buttons: {
        ok: 'Create',
        cancel: 'Cancel'
      }
    };

    let dialogRef = this.openDialog(data);

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if(res.status === 'created' && res.post) {
        this.items.push(res.post);
        this.openSnackBar('Post has been created', 'OK');
      }
    });
  }

  editPost(id) {
    let data = {
      title: 'Edit post',
      buttons: {
        ok: 'Edit',
        cancel: 'Cancel'
      }
    };

    this.adminPostsService.getPost(id)
      .subscribe(res => {
        let post = res;
        console.log(post);

        let dialogRef = this.openDialog(data, post);

        dialogRef.afterClosed().subscribe(res => {
          console.log(res);
          if(res.status === 'updated' && res.post) {
            //this.items.push(res.post);
            this.openSnackBar('Post has been updated', 'OK');
          }
        });
      });
  }

  private openDialog(data, model?) {
    const dialogCfg = {
      disableClose: true
    };

    let dialogRef = this.dialog.open(AdminPostsFormComponent, dialogCfg);

    dialogRef.componentInstance.data = data;

    if(model) {
      dialogRef.componentInstance.model = model;
    }

    return dialogRef;
  }

  private openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
