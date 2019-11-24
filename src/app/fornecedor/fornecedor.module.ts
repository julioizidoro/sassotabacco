import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadfornecedorComponent } from './cadfornecedor/cadfornecedor.component';
import { ConsfornecedorComponent } from './consfornecedor/consfornecedor.component';

@NgModule({
  declarations: [
    CadfornecedorComponent,
    ConsfornecedorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConsfornecedorComponent,
    CadfornecedorComponent
  ],
})
export class FornecedorModule { }
