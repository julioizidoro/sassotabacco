import { Component, OnInit } from '@angular/core';
import { Venda } from '../model/venda';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Vendaproduto } from '../model/vendaproduto';
import { Router } from '@angular/router';
import { VendasService } from '../vendas.service';

@Component({
  selector: 'app-consvendas',
  templateUrl: './consvendas.component.html',
  styleUrls: ['./consvendas.component.scss']
})
export class ConsvendasComponent implements OnInit {

  listaVendas: Venda[];
  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime: true;
  listaVendaProduto: Vendaproduto[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private vendasService: VendasService,
    
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null],
      documento: [null],
    });
    this.consultar();
  }

  consultar() {
    this.vendasService.listar().subscribe(
      resposta => {
        this.listaVendas = resposta as any;
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  novo() {
    this.vendasService.setVenda(null);
    this.router.navigate(['/cadvenda']);
  }

  pesquisar() {
    
  }
  

}
