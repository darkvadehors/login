import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private _http: HttpClient) {
    this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this._currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this._currentUserSubject.value;
  }

  login(username: any, password: any) {
    return this._http.post<any>(`./users/authenticate`, { username, password })
      .pipe(map((user: any) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this._currentUserSubject.next(null as any);
  }
}