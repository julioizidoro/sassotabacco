import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadproducaoComponent } from './cadproducao/cadproducao.component';
import { ConsproducaoComponent } from './consproducao/consproducao.component';
import { ProdutoService } from '../produto/produto.service';

@NgModule({
  declarations: [
    CadproducaoComponent, 
    ConsproducaoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CadproducaoComponent, 
    ConsproducaoComponent
  ],
  providers: [
    ProdutoService,
  ]
})
export class ProducaoModule { }
