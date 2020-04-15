import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadreceitaComponent } from './cadreceita/cadreceita.component';
import { ConsreceitaComponent } from './consreceita/consreceita.component';
import { ReceitaService } from './receita.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FornecedorModule } from '../fornecedor/fornecedor.module';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    CadreceitaComponent, 
    ConsreceitaComponent
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
    CadreceitaComponent, 
    ConsreceitaComponent
  ],
  
  providers: [
    ReceitaService,
  ] 
})
export class ReceitaModule { }
