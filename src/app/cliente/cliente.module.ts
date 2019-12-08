import { SharedModule } from './../shared/shared.module';
import { CadclienteComponent } from './cadcliente/cadcliente.component';
import { ConsclienteComponent } from './conscliente/conscliente.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    ConsclienteComponent,
    CadclienteComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    TextMaskModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserModule,
    SharedModule,
  ],
  exports: [
    ConsclienteComponent,
    CadclienteComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ClienteModule { }
