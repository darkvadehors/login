import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './features/login/container/services/authentication/authentication.service';
import { User } from './features/login/container/model/user';

// import './_content/app.less';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login';
  currentUser!: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate([ '/login' ]);
  }
}
