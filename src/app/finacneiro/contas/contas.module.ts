import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CadpagarComponent } from './pagar/cadpagar/cadpagar.component';
import { ConspagarComponent } from './pagar/conspagar/conspagar.component';
import { CadreceberComponent } from './receber/cadreceber/cadreceber.component';
import { ConsreceberComponent } from './receber/consreceber/consreceber.component';
import { ContasService } from './contas.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

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
    FormsModule,
    RouterModule,
    BrowserModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    CadpagarComponent,
    ConspagarComponent,
    CadreceberComponent,
    ConsreceberComponent
  ],
  providers: [
    ContasService,
  ],
  schemas: [NO_ERRORS_SCHEMA],

})
export class ContasModule { }
