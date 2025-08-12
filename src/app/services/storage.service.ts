import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    private subject = new Subject<object>();
    constructor() {
      // do nothing.
    }

    // set local storage
    setItem(key, value): void {
      this.subject.next({ sminglAdminUser: value });
      localStorage.setItem(key, value);
    }

    // get local storage
    getItem(): object {
      const data = localStorage.getItem('sminglAdminUser');
      this.subject.next({ sminglAdminUser: data });
      return this.subject.asObservable();
    }

    loadSessionData(){
      var sessionStr = JSON.parse(localStorage.getItem('admin'));
      return sessionStr;
    }

    // remove local storage
    removeItem(key): void {
      localStorage.removeItem(key);
    }

    //getCurrentUser
    getUser(): Observable<object> {
      return this.subject.asObservable();
    }
}
