import { GrupoContasService } from './grupocontas.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsGrupoContasComponent } from '../grupocontas/consgrupocontas/consgrupocontas.component';
import { AccordionModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CadGrupoContasComponent } from '../grupocontas/cadgrupocontas/cadgrupocontas.component';

@NgModule({
  declarations: [
    ConsGrupoContasComponent,
    CadGrupoContasComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  exports: [
    ConsGrupoContasComponent
  ],
  providers: [
    GrupoContasService,
  ]
})
export class GrupoContasModule { }
