import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaddevolucaoComponent } from './caddevolucao/caddevolucao.component';
import { ConsdevolucaoComponent } from './consdevolucao/consdevolucao.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { DevolucaoService } from './devolucao.service';

@NgModule({
  declarations: [
    CaddevolucaoComponent, 
    ConsdevolucaoComponent],
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
    DropdownModule,
  ],
  exports: [
    CaddevolucaoComponent, 
    ConsdevolucaoComponent,
  ],
  providers: [
    DevolucaoService,
  ]
})
export class DevolucaoModule { }
