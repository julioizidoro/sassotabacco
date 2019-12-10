import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadacessoComponent } from './cadacesso/cadacesso.component';
import { ConsacessoComponent } from './consacesso/consacesso.component';

@NgModule({
  declarations: [
    CadacessoComponent,
    ConsacessoComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CadacessoComponent,
    ConsacessoComponent,
  ]
})
export class AcessoModule { }
