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

  // Column declarations
  public columns:Array<any> = [
    { title: 'id', name: 'id', filtering: {filterString: '', placeholder: 'Filter by id'}},
    { title: 'name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
    { title: 'e-mail', name: 'email', sort: 'asc'},
    { title: 'phone', name: 'phone', sort: '', filtering: {filterString: '', placeholder: 'Filter by phone'}},
    { title: 'user', name: 'username'},
    { title: 'website', name: 'website'}
  ];

  public columns_prime:Array<any> = [
    { field: 'id', header: 'id' },
    { field: 'name', header: 'name' },
    { field: 'e-mail', header: 'email' },
    { field: 'phone', header: 'phone' },
    { field: 'user', header: 'username' },
    { field: 'website', header: 'website' }
  ];

  // Table config variables
  public page:number = 1;
  public itemsPerPage:number = 5;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  // Table config
  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  // Constructor
  constructor(private sampleService: SampleService) {}

  // Event triggered on screen initialization
  ngOnInit() {
    this.sub = this.sampleService.usersChanged.subscribe(users => {
      this.fullData = users as User[];
      this.length = this.fullData.length;
      this.onChangeTable(this.config);
    });
  }

  // Event triggered on screen disposal
  ngOnDestroy() {
    this.sub.unsubscribe();
  }



  // Event triggered on cell click
  public onCellClick(data: any): any {
    console.log(data);
  }

  public onCellDblClick(data: any): any {
    console.log(2);
  }

  // Function called on page change
  public changePage(page:any, data:Array<any> = this.fullData):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  // Function called on sorting change
  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  // Function called on filter change
  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].toString().match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].toString().match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  // Function called on table changes (data, filters, or sorting)
  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.fullData, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rowData = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }
}
