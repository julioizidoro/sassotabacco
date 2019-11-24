import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadprodutoComponent } from './cadproduto/cadproduto.component';
import { ConsprodutoComponent } from './consproduto/consproduto.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations:  [
    CadprodutoComponent,
    ConsprodutoComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    TextMaskModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserModule,
  ],
  exports: [
    ConsprodutoComponent,
    CadprodutoComponent,
  ]
})
export class ProdutoModule { }
