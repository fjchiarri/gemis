import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedRoutingModule } from './shared.routing.module';
import { RouterModule, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    SharedRoutingModule,
    NgbModule.forRoot()
  ],
  exports: [
    RouterModule,
    NavbarComponent,
    SharedRoutingModule
  ],
  providers: []
})
export class SharedModule { }
