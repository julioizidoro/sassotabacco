import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsvendasComponent } from './consvendas/consvendas.component';
import { CadvendasComponent } from './cadvendas/cadvendas.component';
import { VendasService } from './vendas.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { FornecedorModule } from '../fornecedor/fornecedor.module';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    ConsvendasComponent,
    CadvendasComponent],
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
    FornecedorModule,
    DropdownModule,
    
  ],
  exports: [
    ConsvendasComponent,
    CadvendasComponent
  ],
  providers:[
    VendasService,
  ]
})
export class VendasModule { }
