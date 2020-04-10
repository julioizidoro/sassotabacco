import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadreceitaComponent } from './cadreceita/cadreceita.component';
import { ConsreceitaComponent } from './consreceita/consreceita.component';
import { ReceitaService } from './receita.service';

@NgModule({
  declarations: [
    CadreceitaComponent, 
    ConsreceitaComponent
  ],
  imports: [
    CommonModule
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
