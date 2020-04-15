import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/produto/model/produto';
import { Receita } from '../model/receita';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProdutoService } from 'src/app/produto/produto.service';
import { ReceitaService } from '../receita.service';
import { Router } from '@angular/router';
import { EstoqueService } from 'src/app/estoque/estoque.service';
import { Estoque } from 'src/app/estoque/model/estoque';
import { Receitaproduto } from '../model/receitaproduto';
import { AlertModelService } from 'src/app/share/alert-model.service';



@Component({
  selector: 'app-cadreceita',
  templateUrl: './cadreceita.component.html',
  styleUrls: ['./cadreceita.component.scss']
})
export class CadreceitaComponent implements OnInit {

  listaEstoques: Estoque[];
  listaProdutos: Produto[];
  listaProdutosMateriaPrima: Produto[];
  receita: Receita;
  formulario: FormGroup;
  listaReceitaProdutos: Receitaproduto[];
  produtoSelecionado: Produto;
  produtoReceita: Produto;
  
  constructor(
    private produtoService: ProdutoService,
    private estoqueService: EstoqueService,
    private receitaService: ReceitaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertModelService,
  ) { }

ngOnInit() {
    this.consultaEstoque();
    this.receita = this.receitaService.getReceita();
    if (this.receita != null) {
      this.formulario = this.formBuilder.group({
        idreceita: this.receita.idreceita,
        descricao: this.receita.descricao,
        quantidade: this.receita.quantidade,
        estoque: this.receita.estoque,
        quantidadereceita: [null],
      });   
      this.receitaService.listarProduto(this.receita.idreceita).subscribe(
        resposta => {
          this.listaReceitaProdutos = resposta as any;
        },
        err => {
          console.log(JSON.stringify(err));
        }
      );
    } else {
      this.formulario = this.formBuilder.group({
        idreceita: [null],
        descricao: [null],
        quantidade: [null],
        estoque: [null],
        receitaprodutoList: [null],
        quantidadereceita: [null],
      });
      this.listaReceitaProdutos = [];
    }   
  }

  async consultaEstoque() {
    await this.estoqueService.listarProdutoDescricao('@').subscribe(
      resposta => {
        this.listaEstoques = resposta as any;
        this.listaProdutosMateriaPrima = [];
        this.listaProdutos = [];
        for (let i=0;i<this.listaEstoques.length;i++){
          if (this.listaEstoques[i].produto.materiaprima === true) {
            this.listaProdutosMateriaPrima.push(this.listaEstoques[i].produto);
          } else  this.listaProdutos.push(this.listaEstoques[i].produto);
        }
        if (this.listaProdutos.length>0) {
          this.produtoSelecionado = this.listaProdutos[0];
        }
        if (this.listaProdutosMateriaPrima.length>0) {
          this.produtoReceita = this.listaProdutosMateriaPrima[0];
        }
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  adicionarProduto() {
    let quantidade = this.formulario.get('quantidade').value;
    if (quantidade === null) {
      this.alertService.showAlertDanger("Informa a quantidade de produção");
    } else {
      let quantidadereceita = this.formulario.get('quantidadereceita').value;
      if (quantidadereceita === null) {
        this.alertService.showAlertDanger("Informa a quantidade de matéria prima"); 
      } else {
        let rp = new Receitaproduto();
        rp.quantidade = quantidadereceita;
        rp.estoque = this.getEstoque(this.produtoReceita);
        this.listaReceitaProdutos.push(rp);
        this.produtoReceita = this.listaProdutosMateriaPrima[0];
        this.formulario.patchValue({
          quantidadereceita: [null],
        });
      }
    }
  }

  getEstoque(produto: Produto) {
    for (let i=0; i<this.listaEstoques.length;i++){
      if (this.listaEstoques[i].produto.idproduto === produto.idproduto) {
        return this.listaEstoques[i];
        i = this.listaEstoques.length + 100;
      }
    }
  }

  async salvar() {
    this.receita = this.formulario.value;
    if (this.receita.descricao === null) {
      this.receita.descricao = this.produtoSelecionado.descricao;
    }
    this.receita.estoque = this.getEstoque(this.produtoSelecionado);
    await this.receitaService.salvar(this.receita).subscribe(
      resposta => {
        this.receita = resposta as any;
        for(let i=0;i<this.listaReceitaProdutos.length;i++) {
          this.listaReceitaProdutos[i].receita = this.receita;
        }
        this.receitaService.salvarProduto(this.listaReceitaProdutos).subscribe(
          resposta => {
          },
          err => {
            console.log(JSON.stringify(err));
          }
        );
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
    
    this.receitaService.setReceita(null);
    this.router.navigate(['/consreceita']);
  }

  cancelar() {
    this.receitaService.setReceita(null);
    this.router.navigate(['/consreceita']);
  }

  remover(posicao: number){
    console.log('remover');
    let rp = this.listaReceitaProdutos[posicao];
    if (rp.idreceitaproduto != null) {
      this.receitaService.deleteProduto(rp).subscribe(
        resposta => {
          this.listaReceitaProdutos.splice(posicao,1);
        }
      )
    } else {
      this.listaReceitaProdutos.splice(posicao,1);
    }
    
  }

  
}
