import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadproducaoComponent } from './cadproducao/cadproducao.component';
import { ConsproducaoComponent } from './consproducao/consproducao.component';
import { ProdutoService } from '../produto/produto.service';

import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { FornecedorModule } from '../fornecedor/fornecedor.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    CadproducaoComponent, 
    ConsproducaoComponent
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
    FornecedorModule,
    DropdownModule,
  ],
  exports: [
    CadproducaoComponent, 
    ConsproducaoComponent
  ],
  providers: [
    ProdutoService,
  ]
})
export class ProducaoModule { }
