import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Estoque } from 'src/app/estoque/model/estoque';
import { EstoqueService } from 'src/app/estoque/estoque.service';

@Component({
  selector: 'app-cadproduto',
  templateUrl: './cadproduto.component.html',
  styleUrls: ['./cadproduto.component.scss']
})
export class CadprodutoComponent implements OnInit {

   estoque: Estoque;
   formulario: FormGroup;
   unidade: string;
   materiaprima : boolean;
   
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private estoqueService: EstoqueService,
  ) { }

  ngOnInit() {
    this.estoque = this.estoqueService.getEstoque();
    if (this.estoque == null) {
      this.estoque = new Estoque();
      this.estoque.produto = new Produto();
      this.formulario = this.formBuilder.group({
        idestoque: [null],
        quantidadeestoque: 0,
        customedio: 0,
        valorvenda: 0,
        produto: this.formBuilder.group({
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
        }),
      });
    } else {
      this.formulario = this.formBuilder.group({

        idestoque: this.estoque.idestoque,
        quantidadeestoque: this.estoque.quantidadeestoque,
        customedio: this.estoque.customedio,
        valorvenda: this.estoque.valorvenda,
        produto: this.formBuilder.group({
          idpoduto: this.estoque.produto.idproduto,
          descricao: this.estoque.produto.descricao,
          codigobarras: this.estoque.produto.codigobarras,
          unidade: this.estoque.produto.unidade,
          estoqueminimo: this.estoque.produto.estoqueminimo,
          estoquemaximo: this.estoque.produto.estoquemaximo,
          ncm: this.estoque.produto.ncm,
          cest: this.estoque.produto.cest,
          pesoliquido: this.estoque.produto.pesoliquido,
          pesobruto: this.estoque.produto.pesobruto,
          materiaprima: this.estoque.produto.materiaprima,
        }),
      });
    }
    
  }

  setUnidade() {
    this.unidade = this.formulario.get('produto.unidade').value;
  }

  setMateriaPrima() {
   this.materiaprima = this.formulario.get('produto.materiaprima').value;
  }

  salvar() {
    this.estoque = this.formulario.value;
    this.estoque.produto.unidade = this.unidade;
    this.estoque.produto.materiaprima = this.materiaprima;
    if (this.estoque.customedio == null) {
      this.estoque.customedio = 0;
    }
    if (this.estoque.quantidadeestoque == null) {
      this.estoque.quantidadeestoque = 0;
    }
    if (this.estoque.valorvenda == null ) {
      this.estoque.valorvenda = 0;
    }
    this.estoqueService.salvar( this.estoque).subscribe(
      resposta => {
        this.estoque = resposta as any;
        this.estoqueService.setEstoque(null);
        this.router.navigate(['/consproduto']);
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  cancelar() {
    this.estoqueService.setEstoque(null);
    this.router.navigate([ '/consproduto']);
  }
}

