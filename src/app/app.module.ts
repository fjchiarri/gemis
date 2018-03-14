import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SampleModule } from './sample/sample.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SharedRoutingModule } from './shared/shared.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SampleService } from './sample/sample.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    SampleModule,
    SharedRoutingModule
  ],
  exports:[SharedRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
