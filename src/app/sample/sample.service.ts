import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { User } from '../shared/objects/user.interface';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SampleService {

  // Subject property that will notify us whenever our list has changed
  public usersChanged = new Subject<User[]>();

  // The local user list
  private userList: User[];

  // This is a temporary data source with random user data. It will be replaced a call to our API
  private serviceUrl = 'https://jsonplaceholder.typicode.com/users';

  // The constructor
  constructor(private http: HttpClient) {

    // The call to the data API to retrieve the list of users.
    // We save the data in a local variable and work on this list (the example API is readonly)
    this.http.get<User[]>(this.serviceUrl).subscribe(
      (users:User[])=> {
        this.userList = users;
        this.emitChanges();
      });
  }

  // Service call used to retrieve the list of users
  getUsers() {
    return this.userList.slice();
  }

  // This method notifies our Subject whenever the list has been modified
  private emitChanges() {
    this.usersChanged.next(this.userList.slice());
  }

}
