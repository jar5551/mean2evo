import {Component, OnInit} from '@angular/core';
import {AdminUsersService} from './admin-users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  providers: [AdminUsersService]
})
export class AdminUsersComponent implements OnInit {

  public users: Array<any> = [];

  constructor(private adminUsersService: AdminUsersService) {
  }

  ngOnInit() {
    this.adminUsersService.getUsers()
      .subscribe(res => {
        console.log(res);
        this.users = res;
      })
  }

}
