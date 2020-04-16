import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadacertoComponent } from './cadacerto/cadacerto.component';
import { ConsacertoComponent } from './consacerto/consacerto.component';
import { AcertoService } from './acerto.service';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownModule } from 'primeng/dropdown';
import { BsDatepickerModule, AccordionModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    CadacertoComponent, 
    ConsacertoComponent],
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
    DropdownModule,
  ],
  exports: [
    CadacertoComponent, 
    ConsacertoComponent
  ],
  providers: [
    AcertoService,
  ]
})
export class AcertoModule { }
