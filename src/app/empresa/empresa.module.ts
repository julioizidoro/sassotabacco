import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadempresaComponent } from './cadempresa/cadempresa.component';
import { ConsempresaComponent } from './consempresa/consempresa.component';
import { EmpresaService } from './empresa.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CadempresaComponent,
    ConsempresaComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    TextMaskModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserModule,
    SharedModule,
  ],
  exports: [
    CadempresaComponent,
    ConsempresaComponent
  ],
  providers: [
    EmpresaService,
  ]
})
export class EmpresaModule { }
