import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadcontaComponent } from './cadconta/cadconta.component';
import { ConsccontaComponent } from './conscconta/conscconta.component';

@NgModule({
  declarations: [CadcontaComponent, ConsccontaComponent],
  imports: [
    CommonModule
  ]
})
export class ContaModule { }
