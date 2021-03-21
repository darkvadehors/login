import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '../../../../login/container/model/user';
import { AuthenticationService } from '../../../../login/container/services/authentication/authentication.service';
import { UserService } from '../../../../login/container/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit {
  currentUser: User;
  users: any[] = [];

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _userService: UserService
  ) {
    this.currentUser = this._authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this._userService.delete(id)
      .pipe(first())
      .subscribe(() => { this.loadAllUsers() });
  }

  private loadAllUsers() {
    this._userService.getAll()
      .pipe(first())
      .subscribe(users => { this.users = users });
  }

  logout() {
    this._authenticationService.logout();
    this._router.navigate([ '/login' ]);
  }

}