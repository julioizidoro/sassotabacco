import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadempresaComponent } from './cadempresa/cadempresa.component';
import { ConsempresaComponent } from './consempresa/consempresa.component';
import { EmpresaService } from './empresa.service';

@NgModule({
  declarations: [
    CadempresaComponent, 
    ConsempresaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CadempresaComponent, 
    ConsempresaComponent
  ],
  providers: [
    EmpresaService,
  ]
})
export class EmpresaModule { }
