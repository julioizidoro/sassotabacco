import { PlanoContasService } from './planocontas.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConsPlanoContasComponent } from './consplanocontas/consplanocontas.component';
import { CadsPlanoContasComponent } from './cadplanocontas/cadplanocontas.component';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  declarations: [
    ConsPlanoContasComponent,
    CadsPlanoContasComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DropdownModule,
    FormsModule
  ],
  exports: [
    ConsPlanoContasComponent
  ],
  providers: [
    PlanoContasService,
  ]
})
export class PlanoContasModule { }
