import { Component, OnInit } from '@angular/core';
import { Receita } from 'src/app/receita/model/receita';
import { Producao } from '../model/producao';
import { Producaoproduto } from '../model/producaoproduto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReceitaService } from 'src/app/receita/receita.service';
import { Router } from '@angular/router';
import { ProducaoService } from '../producao.service';
import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Grupoplanoconta } from 'src/app/grupocontas/model/grupoplanoconta';
import { PlanoContasService } from 'src/app/planocontas/planocontas.service';
import { GrupoContasService } from 'src/app/grupocontas/grupocontas.service';
import { Receitaproduto } from 'src/app/receita/model/receitaproduto';
import { AlertModelService } from 'src/app/shared/alert/alert-model.service';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-cadproducao',
  templateUrl: './cadproducao.component.html',
  styleUrls: ['./cadproducao.component.scss']
})
export class CadproducaoComponent implements OnInit {

  listaReceitas: Receita[];
  listaProdutoReceita: Receitaproduto[];
  receitaSelecionada: Receita;
  producao: Producao;
  listaProduto: Producaoproduto[];
  formulario: FormGroup;
  listaPlanoContas: Planoconta;
  planoContaSelecionado: Planoconta;
  listaGrupoContas: Grupoplanoconta;
  grupoContaSelecionado: Grupoplanoconta;
  quantidadeReceita: number;

  constructor(
    private receitaService: ReceitaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private producaoService: ProducaoService,
    private planoContasService: PlanoContasService,
    private grupoContasService: GrupoContasService,
    private alertService: AlertModelService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.producao = this.producaoService.getProducao();
    this.receitaSelecionada = new Receita();
    this.receitaSelecionada.quantidade = 100;
    this.consultar();
    this.listarGrupoConta();
    if (this.producao != null) {
      this.formulario = this.formBuilder.group({
        idproducao: this.producao.idproducao,
        quantidade: this.producao.quantidade,
        custo: this.producao.custo,
        situacao: this.producao.situacao,
        planoconta: this.producao.planoconta,
        receita: this.producao.receita,
        usuario: this.producao.usuario,
        grupoconta: this.producao.planoconta.grupoplanoconta,
      });   
      this.producaoService.listarProduto(this.producao.idproducao).subscribe(
        resposta => {
          this.listaProduto = resposta as any;
        },
        err => {
          console.log(JSON.stringify(err));
        }
      );
    } else {
      this.formulario = this.formBuilder.group({
        idproducao: [null],
        quantidade: [null],
        custo: [null],
        situacao: [null],
        planoconta: [null],
        receita: [null],
        usuario: [null],
        grupoconta: [null],
      });   
      this.listaProduto = [];  
    }
  }

  setReceita() {
    console.log(this.receitaSelecionada.quantidade);
    this.quantidadeReceita = this.receitaSelecionada.quantidade;
    console.log(this.quantidadeReceita);
  }

  consultar(){
    this.receitaService.listar("@").subscribe(
      resposta => {
        this.listaReceitas = resposta as any;
        if (this.listaReceitas.length>0){
          this.receitaSelecionada = this.listaReceitas[0];
          this.quantidadeReceita = this.receitaSelecionada.quantidade;
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

  async calcularCusto() {
    let quantidadeProducao = this.formulario.get('quantidade').value;
    if (quantidadeProducao != null){
    if (this.receitaSelecionada!=null) {
     await this.receitaService.listarProduto(this.receitaSelecionada.idreceita).subscribe(
        resposta => {
          this.listaProdutoReceita = resposta as any;
          if (this.listaProdutoReceita.length>0) {
            let fator = quantidadeProducao / this.receitaSelecionada.quantidade;
            console.log(fator);
            for( let i=0;i<this.listaProdutoReceita.length;i++) {
              let pp = new Producaoproduto();
              pp.estoque = this.listaProdutoReceita[i].estoque;
              pp.quantidade = this.listaProdutoReceita[i].quantidade * fator;
              pp.custo = this.listaProdutoReceita[i].estoque.customedio * pp.quantidade;
              this.listaProduto.push(pp);
            }
          }
        },
        err => {
          console.log(JSON.stringify(err));
        }
      );
    }
    } else  {
      this.alertService.showAlertDanger("Informa a quantidade de produção");
    }
    console.log(this.receitaSelecionada);
  }

  salvar() {
    if (this.listaProduto.length===0) {
      this.alertService.showAlertDanger("Lista de produtos da receita vazia");  
    } else if (this.planoContaSelecionado === null) {
      this.alertService.showAlertDanger("Plano de conta não selecionado");    
    } else {
      this.producao = this.formulario.value;
      this.producao.data = new Date();
      this.producao.planoconta = this.planoContaSelecionado;
      this.producao.receita = this.receitaSelecionada;
      this.producao.situacao = "Aguardando";
      this.producao.usuario = this.authService.getUsuario();
      this.producao.custo = this.calcularCustoTotal();
      this.producao.empresa = this.authService.getEmpresa();
      this.producaoService.salvar(this.producao).subscribe(
        resposta => {
          this.producao = resposta as any;
          for (let i=0;i<this.listaProduto.length;i++){
            this.listaProduto[i].producao = this.producao;
          }
          this.producaoService.salvarProduto(this.listaProduto).subscribe(
            resposta => {
              this.producaoService.setProducao(null);
              this.router.navigate(['/consproducao']);
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
    }
    
  }

  cancelar(){
    this.producaoService.setProducao(null);
    this.router.navigate(['/consproducao']);
  }

  calcularCustoTotal() {
    let custo = 0;
    for(let i=0;i<this.listaProduto.length;i++){
      custo = custo + this.listaProduto[i].custo;
    }
    return custo;
  }

  remover(posicao: number){

  }


}
