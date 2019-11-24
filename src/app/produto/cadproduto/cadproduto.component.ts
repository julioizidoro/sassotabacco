import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-cadproduto',
  templateUrl: './cadproduto.component.html',
  styleUrls: ['./cadproduto.component.scss']
})
export class CadprodutoComponent implements OnInit {

   produto: Produto;
   formulario: FormGroup;
   unidade: string;
   materiaprima = false;
   
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private produtoService: ProdutoService,
  ) { }

  ngOnInit() {
    this.produto = new Produto();
    this.formulario = this.formBuilder.group({

      idpoduto: [null],
      descricao: [null],
      codigobarras: [null],
      unidade: [null],
      estoqueminimo: [null],
      estoquemaximo: [null],
      ncm: [null],
      cest: [null],
      pesoliquido: [null],
      pesobruto: [null],
      materiaprima: [null],
    });
  }

  setUnidade() {
    this.unidade = this.formulario.get('unidade').value;
  }

  setMateriaPrima() {
   this.materiaprima = this.formulario.get('materiaprima').value;
  }

  salvar() {
    this.produto = this.formulario.value;
    this.produto.unidade = this.unidade;
    this.produto.materiaprima = this.materiaprima;
    this.produtoService.salvar( this.produto).subscribe(
      resposta => {
        this.produto = resposta as any;
        this.router.navigate(['/conProduto']);
      }
    );
  }

  cancelar() {
    this.router.navigate([ '/consProduto']);
  }
}

