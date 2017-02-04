import {Component, OnInit} from '@angular/core';
import {AdminUsersService} from './admin-users.service';
import {LoadingService} from './../../../components/loading-indicator/loading.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  providers: [AdminUsersService]
})
export class AdminUsersComponent implements OnInit {

  public users: Array<any> = [];

  constructor(private adminUsersService: AdminUsersService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.loadingService.present();

    this.adminUsersService.getUsers()
      .subscribe(res => {
        this.loadingService.dismiss();

        console.log(res);
        this.users = res;
      })
  }

}
