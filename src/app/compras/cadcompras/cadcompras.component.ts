import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Compras } from '../model/Comrpas';
import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Grupoplanoconta } from 'src/app/grupocontas/model/grupoplanoconta';
import { Instituicao } from 'src/app/cliente/model/instituicao';
import { PlanoContasService } from 'src/app/planocontas/planocontas.service';
import { GrupoContasService } from 'src/app/grupocontas/grupocontas.service';
import { ComprasService } from '../compras.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { Comprasproduto } from '../model/comprasproduto';
import { Estoque } from 'src/app/estoque/model/estoque';
import { EstoqueService } from 'src/app/estoque/estoque.service';
import { Contas } from 'src/app/contas/model/contas';
import * as moment from 'moment';
import { Comprasconta } from '../model/comprasconta';
import { Producao } from 'src/app/producao/model/producao';
import { Produto } from 'src/app/produto/model/produto';
import { AuthService } from 'src/app/usuario/login/auth.service';




@Component({
  selector: 'app-cadcompras',
  templateUrl: './cadcompras.component.html',
  styleUrls: ['./cadcompras.component.scss']
})
export class CadcomprasComponent implements OnInit {

  formulario: FormGroup;
  compra: Compras;
  listaPlanoContas: Planoconta;
  planoContaSelecionado: Planoconta;
  listaGrupoContas: Grupoplanoconta;
  grupoContaSelecionado: Grupoplanoconta;
  fornecedorSelecionado: Instituicao;
  listaFornecedor: Instituicao[];
  listaEstoque: Estoque[];
  listaProdutos: Produto[];
  produtoSelecionado: Produto;
  totalLiquido: number;
  valorTotal: number;
  listaCompraProduto: Comprasproduto[];
  

  constructor(
    private planoContasService: PlanoContasService,
    private grupoContasService: GrupoContasService,
    private clienteService: ClienteService,
    private comprasService: ComprasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private estoqueService: EstoqueService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    console.log("inicio");
    this.listarFornecedor();
    this.listarGrupoConta();
    this.listarEstoque();
    this.iniciarFormularioNovo();
    this.compra = this.comprasService.getCompra();
    if (this.compra != null) {
      this.fornecedorSelecionado = this.compra.instituicao;
      this.grupoContaSelecionado = this.compra.planoconta.grupoplanoconta;
      this.listarPlanoContas(this.grupoContaSelecionado.idgrupoplanoconta);
      this.planoContaSelecionado = this.compra.planoconta;
      this.listaCompraProduto = this.comprasService.getListaCompraProduto();
      this.inicarFormularioEditar();
      this.valorTotal= this.compra.valortotal;
      this.totalLiquido = this.compra.totalliquido;
    } else {
      this.compra = new Compras();
      this.listaCompraProduto = [];
      this.compra.valortotal=0;
      this.compra.totalliquido = 0;
      this.compra.desconto=0;
      this.valorTotal = 0;
      this.totalLiquido = 0;
      this.listaCompraProduto = [];
      this.fornecedorSelecionado = new Instituicao();
      this.fornecedorSelecionado.nome = '';
      this.grupoContaSelecionado = new Grupoplanoconta();
      this.grupoContaSelecionado.descricao = '';
      this.planoContaSelecionado = new Planoconta();
      this.planoContaSelecionado.descricao = '';
    }
  }

  inicarFormularioEditar() {
    this.formulario = this.formBuilder.group({
      idcompras: this.compra.idcompras,
      datacompra: this.compra.datacompra,
      documento: this.compra.documento,
      valortotal: this.compra.valortotal,
      desconto: this.compra.desconto,
      frete: this.compra.frete,
      totalliquido: this.compra.totalliquido,
      formapagamento: this.compra.formapagamento,
      observacao: this.compra.observacao,
      usuario: this.compra.usuario,
      planoconta: this.compra.planoconta,
      instituicao: this.compra.instituicao,
      grupoconta: this.compra.planoconta.grupoplanoconta,
      produtoquantidade: [null],
      produtocusto: [null],
    });
  }

  iniciarFormularioNovo() {
    this.formulario = this.formBuilder.group({
      idcompras: [null],
      datacompra: [null],
      documento: [null],
      valortotal: [null],
      desconto: [null],
      frete: [null],
      totalliquido: [null],
      formapagamento: [null],
      observacao: [null],
      usuario: [null],
      planoconta: [null],
      instituicao: [null],
      grupoconta: [null],
      produtoquantidade: [null],
      produtocusto: [null],
      datavencimento: [null],
    });
  }

  listarEstoque() {
    this.estoqueService.listarProdutoDescricao('@').subscribe(
      resposta => {
        this.listaEstoque = resposta as any;
        if (this.listaEstoque.length>0){
          this.listaProdutos = [];
          for (let i=0;i<this.listaEstoque.length;i++){
            this.listaProdutos.push(this.listaEstoque[i].produto);
          }
          this.produtoSelecionado = this.listaProdutos[0];
        }
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

  addProduto() {
    let quantidade = this.formulario.get('produtoquantidade').value;
    let custo = this.formulario.get('produtocusto').value;
    let compraProduto = new Comprasproduto();
    compraProduto.estoque = this.getEstoque(this.produtoSelecionado);
    compraProduto.custo = custo;
    compraProduto.quantidade = quantidade;
    compraProduto.subtotal = compraProduto.quantidade * compraProduto.custo;
    this.listaCompraProduto.push(compraProduto);
    this.compra.valortotal = this.compra.valortotal + compraProduto.subtotal;
    this.compra.totalliquido = this.compra.valortotal - this.compra.desconto;
    console.log(this.compra.valortotal);
      this.valorTotal = this.compra.valortotal;
      this.totalLiquido = this.compra.totalliquido;  
  }

  removerProuto(posicao: number) {
    let produto = new Comprasproduto();
    produto = this.listaCompraProduto[posicao];
    this.compra.valortotal = this.compra.valortotal - produto.subtotal;
    this.compra.totalliquido = this.compra.valortotal - this.compra.desconto;
    this.listaCompraProduto.splice(posicao, 1);
  }

  

  


  salvar() {
    console.log('salvar');
    this.compra = this.formulario.value;
    this.compra.instituicao = this.fornecedorSelecionado;
    this.compra.usuario = this.authService.usuario;
    this.compra.valortotal = this.valorTotal;
    this.compra.totalliquido = this.totalLiquido;
    this.compra.empresa = this.authService.getEmpresa();
    this.comprasService.salvar(this.compra).subscribe(
      resposta => {
        this.compra = resposta as any;
        for(let i=0;i<this.listaCompraProduto.length;i++){
          this.listaCompraProduto[i].compras = this.compra;
        }
        this.comprasService.salvarProduto(this.listaCompraProduto).subscribe(
          resposta => {
            this.router.navigate(['/conscompras']);
          },
          err => {
            console.log(JSON.stringify(err));
          }
        );
      }
    )

  }

  cancelar() {
      this.formulario.reset();
      this.router.navigate(['/conscompras']);
  }

  getEstoque(produto: Produto) {
    for (let i=0; i<this.listaEstoque.length;i++){
      if (this.listaEstoque[i].produto.idproduto === produto.idproduto) {
        return this.listaEstoque[i];
        i = this.listaEstoque.length + 100;
      }
    }
  }

  calcularDesconto() {
    let desconto = this.formulario.get('desconto').value;
    if (desconto!=null) {
      this.totalLiquido = this.valorTotal - desconto;
      this.formulario.patchValue({
        totalliquido: this.totalLiquido,
      }); 
    } 
  }
}
