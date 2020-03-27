import { ContasService } from './contas.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CadpagarComponent } from './pagar/cadpagar/cadpagar.component';
import { ConspagarComponent } from './pagar/conspagar/conspagar.component';
import { CadreceberComponent } from './receber/cadreceber/cadreceber.component';
import { ConsreceberComponent } from './receber/consreceber/consreceber.component';
import { DropdownModule } from 'primeng/dropdown';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    CadpagarComponent,
    ConspagarComponent,
    CadreceberComponent,
    ConsreceberComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    DropdownModule,
    AccordionModule.forRoot(),
    FormsModule
  ],
  exports: [
    CadpagarComponent,
    ConspagarComponent,
    CadreceberComponent,
    ConsreceberComponent
  ],
  providers: [
    ContasService,
  ]

})
export class ContasModule { }
