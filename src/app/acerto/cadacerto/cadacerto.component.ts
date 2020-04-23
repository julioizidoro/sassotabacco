import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/produto/model/produto';
import { Estoque } from 'src/app/estoque/model/estoque';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Grupoplanoconta } from 'src/app/grupocontas/model/grupoplanoconta';
import { Acertoproduto } from '../model/acertoproduto';
import { Acerto } from '../model/acerto';
import { EstoqueService } from 'src/app/estoque/estoque.service';
import { AcertoService } from '../acerto.service';
import { Router } from '@angular/router';
import { PlanoContasService } from 'src/app/planocontas/planocontas.service';
import { GrupoContasService } from 'src/app/grupocontas/grupocontas.service';
import { AlertModelService } from 'src/app/shared/alert/alert-model.service';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { min } from 'moment';
import { Instituicao } from 'src/app/cliente/model/instituicao';
import { ClienteService } from 'src/app/cliente/cliente.service';

@Component({
  selector: 'app-cadacerto',
  templateUrl: './cadacerto.component.html',
  styleUrls: ['./cadacerto.component.scss']
})
export class CadacertoComponent implements OnInit {

  listaProdutos: Produto[];
  produtoSelecionado: Produto;
  listaEstoque: Estoque[];
  formulario: FormGroup;
  listaPlanoContas: Planoconta;
  planoContaSelecionado: Planoconta;
  listaGrupoContas: Grupoplanoconta;
  grupoContaSelecionado: Grupoplanoconta;
  listaAcertoProduto: Acertoproduto[];
  acerto: Acerto;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private estoqueService: EstoqueService,
    private acertoService: AcertoService,
    private planoContasService: PlanoContasService,
    private grupoContasService: GrupoContasService,
    private alertService: AlertModelService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.acertoService.getAcerto();
    this.listarEstoque();
    this.listarGrupoConta();
    if (this.acerto != null) {
      this.formulario = this.formBuilder.group({
        idacerto: this.acerto.idacerto,
        data: this.acerto.data,
        custo: this.acerto.custo,
        motivo: this.acerto.motivo,
        planoconta: this.acerto.planoconta,
        usuario: this.acerto.usuario,
        grupoconta: [null],
        quantidadeacerto: [null],
      });
      this.acertoService.listarProduto(this.acerto.idacerto).subscribe(
        resposta => {
          this.listaAcertoProduto = resposta as any;
        },
        err => {
          console.log(JSON.stringify(err));
        }
      );
    } else {
        this.formulario = this.formBuilder.group({
          idacerto: [null],
          data: [null],
          custo: [null],
          motivo: [null],
          planoconta: [null],
          usuario: [null],
          grupoconta: [null],
          quantidadeacerto: [null],
        });
        this.listaAcertoProduto = [];
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
      let ap = new Acertoproduto();
      ap.quantidade = this.formulario.get('quantidadeacerto').value;
      ap.estoque = this.getEstoque(this.produtoSelecionado);
      ap.custo = ap.quantidade * ap.estoque.customedio;
      let custo = this.formulario.get('custo').value;
      custo = custo + ap.custo;
      this.formulario.patchValue({
        custo: custo,
        quantidadeacerto: [null],
      });
      this.listaAcertoProduto.push(ap);
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
    custo = custo - this.listaAcertoProduto[posicao].custo;
    this.formulario.patchValue({
      custo: custo,
      quantidadeacerto: [null],
    });
    this.listaAcertoProduto.splice(posicao, 1);
  }

  salvar() {
    this.acerto = this.formulario.value;
    this.acerto.planoconta = this.planoContaSelecionado;
    if (this.acerto.usuario === null){
      this.acerto.usuario = this.authService.getUsuario();
    }
    this.acerto.empresa = this.authService.getEmpresa();
    this.acertoService.salvarAcerto(this.acerto).subscribe(
      resposta => {
        this.acerto = resposta as any;
        for(let i=0;i<this.listaAcertoProduto.length;i++){
          this.listaAcertoProduto[i].acerto = this.acerto;
        }
        this.acertoService.salvarproduto(this.listaAcertoProduto).subscribe(
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
    this.acertoService.setAcerto(null);
    this.router.navigate(['/consacerto']);
  }

  cancelar() {
    this.acertoService.setAcerto(null);
    this.router.navigate(['/consacerto']);
  }



}