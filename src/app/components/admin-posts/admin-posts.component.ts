import {Component, OnInit} from '@angular/core';
import {AdminPostsService} from './admin-posts.service';
import {LoadingService} from 'app/components/loading/loading.service';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss'],
  providers: [AdminPostsService]
})

export class AdminPostsComponent implements OnInit {

  public items: Array<any>;
  public templateConfig: Object;


  constructor(private adminPostsService: AdminPostsService,
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

  }

  private openSnackBar(message, action) {
  }

  private getElementIndexInArrayById(array, id) {
    return array.indexOf(array.find(element => element._id === id));
  }

}
