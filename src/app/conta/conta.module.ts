import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadcontaComponent } from './cadconta/cadconta.component';
import { ConsccontaComponent } from './conscconta/conscconta.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [CadcontaComponent, ConsccontaComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    BrowserModule,
  ],
  exports: [
    CadcontaComponent, 
    ConsccontaComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ContaModule { }
