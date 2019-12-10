import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadfornecedorComponent } from './cadfornecedor/cadfornecedor.component';
import { ConsfornecedorComponent } from './consfornecedor/consfornecedor.component';
import { AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { ClienteModule } from '../cliente/cliente.module';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CadfornecedorComponent,
    ConsfornecedorComponent
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    SharedModule,
    ClienteModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    BrowserModule,

  ],
  exports: [
    ConsfornecedorComponent,
    CadfornecedorComponent
  ],
})
export class FornecedorModule { }
