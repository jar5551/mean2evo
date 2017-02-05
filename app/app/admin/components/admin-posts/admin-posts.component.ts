import {Component, OnInit} from '@angular/core';
import {AdminPostsService} from './admin-posts.service';
import {MdDialog, MdSnackBar} from '@angular/material';
import {AdminPostsFormComponent} from './admin-posts-form.component';
import {LoadingService} from './../../../components/loading-indicator/loading.service';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss'],
  providers: [AdminPostsService]
})

export class AdminPostsComponent implements OnInit {

  public items: Array<any>;
  public templateConfig: Object;

  //smart tables
  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      firstName: {
        title: 'First Name',
        type: 'string'
      },
      lastName: {
        title: 'Last Name',
        type: 'string'
      },
      username: {
        title: 'Username',
        type: 'string'
      },
      email: {
        title: 'E-mail',
        type: 'string'
      },
      age: {
        title: 'Age',
        type: 'number'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  //smart tables end



  constructor(private adminPostsService: AdminPostsService,
              public dialog: MdDialog,
              public snackBar: MdSnackBar,
              private loadingService: LoadingService) {}


  // for smat tables
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
    this.loadingService.present();

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
    this.loadingService.dismiss();
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
      if (res.status === 'created' && res.post) {
        this.items.push(res.post);
        this.openSnackBar('Post has been created', 'OK');
      }
    });
  }

  editPost(id, e) {
    this.loadingService.present();

    let data = {
      title: 'Edit post',
      buttons: {
        ok: 'Edit',
        cancel: 'Cancel'
      }
    };

    this.adminPostsService.getPost(id)
      .subscribe(res => {
        this.loadingService.dismiss();

        let post = res;

        let dialogRef = this.openDialog(data, post);

        dialogRef.afterClosed().subscribe(res => {
          if (res.status === 'updated' && res.post) {
            let index = this.getElementIndexInArrayById(this.items, id);

            this.items[index].title = res.post.title;

            this.openSnackBar('Post has been updated', 'OK');
          }
        });
      });

    if (e != null) {
      e.preventDefault();
    }
  }

  moveToTrash(id, e) {
    this.loadingService.present();

    this.adminPostsService.trashPost(id)
      .subscribe(res => {
        this.loadingService.dismiss();

      });

    if (e != null) {
      e.preventDefault();
    }
  }

  private openDialog(data, model?) {
    const dialogCfg = {
      disableClose: true
    };

    let dialogRef = this.dialog.open(AdminPostsFormComponent, dialogCfg);

    dialogRef.componentInstance.data = data;

    if (model) {
      dialogRef.componentInstance.model = model;
    }

    return dialogRef;
  }

  private openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private getElementIndexInArrayById(array, id) {
    return array.indexOf(array.find(element => element._id === id));
  }

}
