import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Instituicao } from 'src/app/cliente/model/instituicao';
import { PlanoContasService } from 'src/app/planocontas/planocontas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contas } from '../../model/contas';
import { ContasService } from '../../contas.service';
import { FluxocaixaService } from 'src/app/fluxocaixa/fluxocaixa.service';
import { Fluxocaixa } from 'src/app/fluxocaixa/model/fluxocaixa';
import { ModalDirective } from 'ngx-bootstrap';
import { Usuario } from 'src/app/usuario/model/usuario';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Conta } from 'src/app/conta/model/conta';
import { Grupoplanoconta } from 'src/app/grupocontas/model/grupoplanoconta';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { GrupoContasService } from 'src/app/grupocontas/grupocontas.service';
import { ContaService } from 'src/app/conta/conta.service';

@Component({
  selector: 'app-cad0pagar',
  templateUrl: './cadpagar.component.html',
  styleUrls: ['./cadpagar.component.scss']
})
export class CadpagarComponent implements OnInit {

  formulario: FormGroup;
  fromularioGrupoConta: FormGroup;
  conta: Contas;
  planoContaSelecionado: Planoconta;
  instituicaoSelecionada: Instituicao;
  nomeCliente: string;
  listaPlanoContas: Planoconta[];
  listaBancos: Conta[];
  bancoSelecionado: Conta;
  listaGrupoContas: Grupoplanoconta[];
  grupoContaSelecionado : Grupoplanoconta;
  inscricao: Subscription;
  tipo: string;
  habilitar: string;
  receber: boolean;
  usuario: Usuario;
  @ViewChild('fluxoCaixa', null) public showModalFluxoCaixaOnClick: ModalDirective;

  constructor(
    private planocontaservice: PlanoContasService,
    private contasService: ContasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private fluxoCaixaService: FluxocaixaService,
    private authService: AuthService,
    private clienteService: ClienteService,
    private grupoContaService: GrupoContasService,
    private contaService: ContaService,
  
  ) {
    this.conta = this.contasService.getContas();
  }

  ngOnInit() {

    this.usuario = this.authService.usuario;
    this.receber = this.contasService.getReceber();
    this.instituicaoSelecionada = new Instituicao();
    this.instituicaoSelecionada.nome = '';
    this.nomeCliente = '';


    this.setFormulario();
    this.listarGrupoPlanoContas();
    this.listarContaBanco();
    if (this.conta != null) {

      this.formulario = this.formBuilder.group({
        idcontas: this.conta.idcontas,
        documento: this.conta.documento,
        dataemissao: this.conta.dataemissao,
        datavencimento: this.conta.datavencimento,
        numeroparcela: this.conta.numeroparcela,
        valorparcela: this.conta.valorparcela,
        desconto: this.conta.desconto,
        juros: this.conta.juros,
        datapagamento: this.conta.datapagamento,
        valorpago: this.conta.valorpago,
        observacao: this.conta.observacao,
        codigobarras: this.conta.codigobarras,
        tipo: this.conta.tipo,
        instituicao: this.conta.instituicao,
        conta: this.conta.conta,
        planoconta: this.conta.planoconta,
        grupoConta: this.conta.planoconta.grupoplanoconta,
      });
      this.bancoSelecionado = this.conta.conta;
      this.grupoContaSelecionado = this.conta.planoconta.grupoplanoconta;
      this.planoContaSelecionado = this.conta.planoconta;
      this.instituicaoSelecionada = this.conta.instituicao;
    } else {
      this.conta = new Contas();
      this.conta.dataemissao = new Date();
      if ( this.clienteService.getInstituicao() != null) {
        this.instituicaoSelecionada = this.clienteService.getInstituicao();
        this.nomeCliente = this.instituicaoSelecionada.nome;
        this.clienteService.setInstituicao(null);
      }
    }
  }

  listarPlanoContas() {
    this.planocontaservice.pesquisarGrupo(this.grupoContaSelecionado.idgrupoplanoconta).subscribe(
      resposta => {
        this.listaPlanoContas = resposta as any;
      }
    );
  }

  listarContaBanco() {
    this.contaService.listar('@').subscribe(
      resposta => {
        this.listaBancos = resposta as any;
      }
    );
  }

  listarGrupoPlanoContas() {
    this.grupoContaService.listar().subscribe(
      resposta => {
        this.listaGrupoContas = resposta as any;
        this.grupoContaSelecionado = this.listaGrupoContas[0];
        this.listarPlanoContas();
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
    console.log('grupoconta');
    this.grupoContaSelecionado = this.formulario.get('grupoConta').value;
    if (this.grupoContaSelecionado != null ) {
      this.listarPlanoContas();
    }
  }

  compararContaBanco(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setContaBanco() {
    this.bancoSelecionado = this.formulario.get('conta').value;
  }

  consultaCliente() {
    this.clienteService.setRota('contaspagar');
    this.router.navigate(['/conscliente']);
  }

  salvar() {
    if (this.receber) {
      this.baixar();
    } else {
      this.incluir();
    }
  }

  incluir() {
    this.conta = this.formulario.value;
    this.conta.instituicao = this.instituicaoSelecionada;
    this.conta.planoconta = this.planoContaSelecionado;
    this.conta.conta = this.bancoSelecionado;
    this.conta.valorpago = 0;
    this.conta.desconto = 0;
    this.conta.juros = 0;
    this.conta.tipo = 'p';
    this.contasService.salvarCP(this.conta).subscribe(
      resposta => {
        this.conta = resposta as any;
        this.contasService.setContas(null);
        this.router.navigate(['/conspagar']);
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  cancelar() {
    this.formulario.reset();
    this.router.navigate(['/conspagar']);
  }

  setFormulario() {
    this.formulario = this.formBuilder.group({
      idcontas: [null],
      documento: [null],
      dataemissao: new Date(),
      datavencimento: [null],
      numeroparcela: [null],
      valorparcela: [null],
      desconto: [null],
      juros: [null],
      datapagamento: [null],
      valorpago: 0,
      observacao: [null],
      codigobarras: [null],
      tipo: [null],
      instituicao: [null],
      conta: [null],
      planoconta: [null],
      grupoConta: [null],
    });
  }

  calcularValorPago() {
    this.conta = this.formulario.value;
    this.conta.valorpago = (this.conta.valorparcela + this.conta.juros) - this.conta.desconto;
    this.formulario.patchValue({
      valorpago: this.conta.valorpago
    });
  }

  baixar() {
    this.conta = this.formulario.value;
    this.conta.instituicao = this.instituicaoSelecionada;
    this.conta.planoconta = this.planoContaSelecionado;
    this.contasService.baixarCP(this.conta).subscribe(
      resposta => {
        this.conta = resposta as any;
        this.contasService.setContas(null);
        this.router.navigate(['/conspagar']);
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  verificarSaldoFluxoCaixa(liberarSaldo: boolean) {
    if (liberarSaldo) {
      this.incluir();
    } else {
      this.fluxoCaixaService.getData(this.conta.datavencimento).subscribe(
        resposta => {
          const fluxocaixa = resposta as Fluxocaixa;
          if (fluxocaixa.saldoatual < this.conta.valorparcela) {
            this.showModalFluxoCaixaOnClick.show();
          } else {
            this.incluir();
          }
        },
        err => {
          console.log(err.error.erros.join(' '));
        }
      );
    }
  }
}
