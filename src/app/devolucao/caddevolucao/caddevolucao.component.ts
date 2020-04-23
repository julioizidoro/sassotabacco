import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/produto/model/produto';
import { Estoque } from 'src/app/estoque/model/estoque';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Grupoplanoconta } from 'src/app/grupocontas/model/grupoplanoconta';
import { Devolucaoproduto } from '../model/devolucaoproduto';
import { Devolucao } from '../model/devolucao';
import { Router } from '@angular/router';
import { EstoqueService } from 'src/app/estoque/estoque.service';
import { DevolucaoService } from '../devolucao.service';
import { PlanoContasService } from 'src/app/planocontas/planocontas.service';
import { GrupoContasService } from 'src/app/grupocontas/grupocontas.service';
import { AlertModelService } from 'src/app/shared/alert/alert-model.service';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { Instituicao } from 'src/app/cliente/model/instituicao';

@Component({
  selector: 'app-caddevolucao',
  templateUrl: './caddevolucao.component.html',
  styleUrls: ['./caddevolucao.component.scss']
})
export class CaddevolucaoComponent implements OnInit {

  listaProdutos: Produto[];
  produtoSelecionado: Produto;
  listaEstoque: Estoque[];
  formulario: FormGroup;
  listaPlanoContas: Planoconta;
  planoContaSelecionado: Planoconta;
  listaGrupoContas: Grupoplanoconta;
  grupoContaSelecionado: Grupoplanoconta;
  listaDevolucaoProduto: Devolucaoproduto[];
  devolucao: Devolucao;
  listaFornecedor: Instituicao[];
  fornecedorSelecionado: Instituicao;
 

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private estoqueService: EstoqueService,
    private devolucaoService: DevolucaoService,
    private planoContasService: PlanoContasService,
    private grupoContasService: GrupoContasService,
    private alertService: AlertModelService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.devolucaoService.getDevolucao();
    this.listarEstoque();
    this.listarGrupoConta();
    this.listarFornecedor();
    if (this.devolucao != null) {
      this.formulario = this.formBuilder.group({
        iddevolucao: this.devolucao.iddevolucao,
        data: this.devolucao.data,
        custo: this.devolucao.custo,
        observacao: this.devolucao.observacao,
        planoconta: this.devolucao.planoconta,
        usuario: this.devolucao.usuario,
        grupoconta: [null],
        quantidadedevolucao: [null],
      });
      this.devolucaoService.listarProduto(this.devolucao.iddevolucao).subscribe(
        resposta => {
          this.listaDevolucaoProduto = resposta as any;
        },
        err => {
          console.log(JSON.stringify(err));
        }
      );
    } else {
        this.formulario = this.formBuilder.group({
          iddevolucao: [null],
          data: [null],
          custo: [null],
          motivo: [null],
          planoconta: [null],
          usuario: [null],
          grupoconta: [null],
          quantidadedevolucao: [null],
        });
        this.listaDevolucaoProduto = [];
    }
  }

  listarGrupoConta() {
    this.grupoContasService.listar().subscribe(
      resposta => {
        this.listaGrupoContas = resposta as any;
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  listarPlanoContas(idgrupo: number) {
    this.planoContasService.pesquisarGrupo(idgrupo).subscribe(
      resposta => {
        this.listaPlanoContas = resposta as any;
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }

  listarFornecedor() {
    this.clienteService.listar('f').subscribe(
      resposta => {
        this.listaFornecedor = resposta as any;
        if (this.listaFornecedor.length>0){
          this.fornecedorSelecionado = this.listaFornecedor[0];
        }
      },
      err => {
        console.log(JSON.stringify(err));
      }
    );
  }


  compararPalnoConta(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setPlanoConta() {
    this.planoContaSelecionado = this.formulario.get('planoconta').value;
  }

  compararGrupoConta(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setGrupoConta() {
    this.grupoContaSelecionado = this.formulario.get('grupoconta').value;
    if (this.grupoContaSelecionado != null) {
      this.listarPlanoContas(this.grupoContaSelecionado.idgrupoplanoconta);
    }
  }

  listarEstoque() {
    this.estoqueService.listarProdutoDescricao("@").subscribe(
      resposta => {
        this.listaEstoque = resposta as any;
        if (this.listaEstoque.length>0) {
          this.listaProdutos = [];
          for(let i=0;i<this.listaEstoque.length;i++){
            this.listaProdutos.push(this.listaEstoque[i].produto);
          }
          if (this.listaProdutos.length>0){
            this.produtoSelecionado = this.listaProdutos[0];
          }
        }
      }
    )
  }

  adicionarProduto() {
    if (this.produtoSelecionado != null) {
      let ap = new Devolucaoproduto();
      ap.quantidade = this.formulario.get('quantidadedevolucao').value;
      ap.estoque = this.getEstoque(this.produtoSelecionado);
      ap.custo = ap.quantidade * ap.estoque.customedio;
      let custo = this.formulario.get('custo').value;
      custo = custo + ap.custo;
      this.formulario.patchValue({
        custo: custo,
        quantidadedevolucao: [null],
      });
      this.listaDevolucaoProduto.push(ap);
    }  
  }

  getEstoque(produto: Produto) {
    for (let i=0; i<this.listaEstoque.length;i++){
      if (this.listaEstoque[i].produto.idproduto === produto.idproduto) {
        return this.listaEstoque[i];
        i = this.listaEstoque.length + 100;
      }
    }
  }

  removerProduto(posicao: number){
    let custo = this.formulario.get('custo').value;
    custo = custo - this.listaDevolucaoProduto[posicao].custo;
    this.formulario.patchValue({
      custo: custo,
      quantidadedevolucao: [null],
    });
    this.listaDevolucaoProduto.splice(posicao, 1);
  }

  salvar() {
    this.devolucao = this.formulario.value;
    this.devolucao.planoconta = this.planoContaSelecionado;
    this.devolucao.empresa = this.authService.getEmpresa();
    if (this.devolucao.usuario === null){
      this.devolucao.usuario = this.authService.getUsuario();
    }
    this.devolucaoService.salvarDevolucao(this.devolucao).subscribe(
      resposta => {
        this.devolucao = resposta as any;
        for(let i=0;i<this.listaDevolucaoProduto.length;i++){
          this.listaDevolucaoProduto[i].devolucao = this.devolucao;
        }
        this.devolucaoService.salvarproduto(this.listaDevolucaoProduto).subscribe(
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
    )
    this.devolucaoService.setDevolucao(null);
    this.router.navigate(['/consdevolucao']);
  }

  cancelar() {
    this.devolucaoService.setDevolucao(null);
    this.router.navigate(['/consdevolucao']);
  }



}