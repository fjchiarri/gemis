import { Component, OnInit, OnDestroy } from '@angular/core';
import { SampleService } from '../sample.service';
import { User } from '../../shared/objects/user.interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  // The subscription. This allows us to be notified when our user list is modified
  private sub: Subscription;

  // The full data set
  fullData: User[];

  // The displayed data set (potentially filtered)
  rowData: User[];

  filterValue: string;

  // Column declarations
  public columns:Array<any> = [
    { field: 'id', header: 'id' },
    { field: 'name', header: 'name' },
    { field: 'e-mail', header: 'email' },
    { field: 'phone', header: 'phone' },
    { field: 'user', header: 'username' },
    { field: 'website', header: 'website' }
  ];

  // Constructor
  constructor(private sampleService: SampleService) {}

  // Event triggered on screen initialization
  ngOnInit() {
    this.sub = this.sampleService.usersChanged.subscribe(users => {
      this.fullData = users as User[];
    });
  }

  // Event triggered on screen disposal
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onFilterTable() {

  }
}
