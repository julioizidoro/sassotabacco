import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadfornecedorComponent } from './cadfornecedor/cadfornecedor.component';
import { ConsfornecedorComponent } from './consfornecedor/consfornecedor.component';
import { AccordionModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    CadfornecedorComponent,
    ConsfornecedorComponent
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ConsfornecedorComponent,
    CadfornecedorComponent
  ],
})
export class FornecedorModule { }
