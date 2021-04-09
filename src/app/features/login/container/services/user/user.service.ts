import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../model/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _http: HttpClient) { }

  getAll() {
    // API rest => function get `http://localhost:3000/user` return all users
    return this._http.get<User[]>(`./user`);
  }

  register(user: User) {
    // return this._http.post(`./auth/signup`, user);

    const {
      firstName,
      lastName,
      password,
      username
    } = user

    return this._http.post(`http://localhost:3000/auth/signup`, { email: username, password: password });
  }

  delete(id: number) {
    return this._http.delete(`./user/${id}`);
  }
}