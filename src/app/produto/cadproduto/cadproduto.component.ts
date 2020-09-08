import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Estoque } from 'src/app/estoque/model/estoque';
import { EstoqueService } from 'src/app/estoque/estoque.service';
import { AuthService } from 'src/app/usuario/login/auth.service';


@Component({
  selector: 'app-cadproduto',
  templateUrl: './cadproduto.component.html',
  styleUrls: ['./cadproduto.component.scss']
})
export class CadprodutoComponent implements OnInit {

   estoque: Estoque;
   formulario: FormGroup;
   unidade: string;
   
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private estoqueService: EstoqueService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.estoque = this.estoqueService.getEstoque();
    if (this.estoque == null) {
      this.estoque = new Estoque();
      this.estoque.produto = new Produto();
      this.formulario = this.formBuilder.group({
        descricao: [null],
        unidade:[null],
        codigobarras: [null],
        estoqueminimo: [null],
        estoquemaximo: [null],
        quantidadeestoque: [null],
        customedio: [null],        
        valorvenda: [null],
        ncm: [null],
        cest: [null],
      });
    } else {
      this.formulario = this.formBuilder.group({

        descricao: this.estoque.produto.descricao,
        unidade: this.estoque.produto.unidade,
        codigobarras: this.estoque.produto.codigobarras,
        estoqueminimo: this.estoque.produto.estoqueminimo,
        estoquemaximo: this.estoque.produto.estoquemaximo,
        quantidadeestoque: this.estoque.quantidadeestoque,
        customedio: this.estoque.customedio,
        valorvenda: this.estoque.valorvenda,
        ncm: this.estoque.produto.ncm,
        cest: this.estoque.produto.cest,
      });
    }
    
  }

  setUnidade() {
    this.unidade = this.formulario.get('unidade').value;
  }

  

  salvar() {
    if (this.estoque === null) {
      this.estoque = new Estoque();
    }
    this.estoque.produto.descricao = this.formulario.get('descricao').value;
    this.estoque.produto.unidade = this.formulario.get('unidade').value;
    this.estoque.produto.codigobarras = this.formulario.get('codigobarras').value;
    if (this.formulario.get('estoqueminimo').value===null) {
      this.estoque.produto.estoqueminimo = 0;  
    } else this.estoque.produto.estoqueminimo = this.formulario.get('estoqueminimo').value;
    if (this.formulario.get('estoquemaximo').value===null) {
      this.estoque.produto.estoquemaximo = 0;  
    } else this.estoque.produto.estoquemaximo = this.formulario.get('estoquemaximo').value;
    if (this.formulario.get('quantidadeestoque').value===null) {
      this.estoque.quantidadeestoque = 0;  
    } else this.estoque.quantidadeestoque = this.formulario.get('quantidadeestoque').value;
    if (this.formulario.get('customedio').value===null) {
      this.estoque.customedio = 0;  
    } else this.estoque.customedio = this.formulario.get('customedio').value;
    if (this.formulario.get('valorvenda').value === null) {
      this.estoque.valorvenda = 0;
    } else this.estoque.valorvenda = this.formulario.get('valorvenda').value;
    this.estoque.produto.ncm = this.formulario.get('ncm').value;
    this.estoque.produto.cest = this.formulario.get('cest').value;

    if (this.estoque.customedio == null) {
      this.estoque.customedio = 0;
    }
    if (this.estoque.quantidadeestoque == null) {
      this.estoque.quantidadeestoque = 0;
    }
    if (this.estoque.valorvenda == null ) {
      this.estoque.valorvenda = 0;
    }
    this.estoque.empresa = this.authService.getEmpresa();
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

