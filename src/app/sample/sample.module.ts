import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SampleComponent } from './sample.component';
import { ListComponent } from './list/list.component';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';
import { SampleService } from './sample.service';
import { HttpClientModule } from '@angular/common/http';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    SampleComponent,
    ListComponent,
    DisplayComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    FormsModule,
    TableModule
  ],
  exports: [
    SampleComponent,
    ListComponent,
    DisplayComponent,
    EditComponent
  ],
  providers: [SampleService]
})
export class SampleModule { }
