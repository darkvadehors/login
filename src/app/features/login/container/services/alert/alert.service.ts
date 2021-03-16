import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private _subject = new Subject<any>();
  private _keepAfterRouteChange = false;

  constructor(private _router: Router) { // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this._keepAfterRouteChange) {
          // only keep for a single route change
          this._keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this._subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this._keepAfterRouteChange = keepAfterRouteChange;
    this._subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterRouteChange = false) {
    this._keepAfterRouteChange = keepAfterRouteChange;
    this._subject.next({ type: 'error', text: message });
  }

  clear() {
    // clear by calling subject.next() without parameters
    this._subject.next();
  }
}
