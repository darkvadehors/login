import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../model/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _http: HttpClient) { }

  getAll() {
    return this._http.get<User[]>(`./users`);
  }

  register(user: User) {
    return this._http.post(`./users/register`, user);
  }

  delete(id: number) {
    return this._http.delete(`./users/${id}`);
  }
}