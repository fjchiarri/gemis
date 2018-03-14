import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SampleComponent } from './sample.component';
import { ListComponent } from './list/list.component';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';
import { SampleService } from './sample.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';


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
    FormsModule,
    TableModule,
    InputTextModule
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
