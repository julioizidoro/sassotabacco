import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Instituicao } from 'src/app/cliente/model/instituicao';
import { PlanoContasService } from 'src/app/planocontas/planocontas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contas } from '../../model/contas';
import { Formapagamento } from 'src/app/formapagamento/model/formapagamento';
import { ContasService } from '../../contas.service';
import { FormapagamentoService } from 'src/app/formapagamento/formapagamento.service';
import { Fluxocaixa } from 'src/app/fluxocaixa/model/fluxocaixa';
import { FluxocaixaService } from 'src/app/fluxocaixa/fluxocaixa.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Usuario } from 'src/app/usuario/model/usuario';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Conta } from 'src/app/conta/model/conta';
import { Grupoplanoconta } from 'src/app/grupocontas/model/grupoplanoconta';
import { ClienteService } from 'src/app/cliente/cliente.service';

@Component({
  selector: 'app-cadreceber',
  templateUrl: './cadreceber.component.html',
  styleUrls: ['./cadreceber.component.css']
})
export class CadreceberComponent implements OnInit {

  formulario: FormGroup;
  conta: Contas;
  planoContaSelecionado: Planoconta;
  instituicaoSelecionada: Instituicao;
  nomeCliente: string;
  formaPagamentoSelecionada: Formapagamento;
  listaPlanoContas: Planoconta[];
  listaFormaPagamento: Formapagamento[];
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
    private activeRrouter: ActivatedRoute,
    private router: Router,
    private fluxoCaixaService: FluxocaixaService,
    private formaPagamentoService: FormapagamentoService,
    private authService: AuthService,
    private clienteService: ClienteService,
  ) {
    this.conta = this.contasService.getContas();
  }

  ngOnInit() {
    this.usuario = this.authService.usuario;
    this.receber = this.contasService.getReceber();
    this.instituicaoSelecionada = this.clienteService.getInstituicao();
    if ( this.instituicaoSelecionada === null) {
      this.instituicaoSelecionada = new Instituicao();
      this.instituicaoSelecionada.nome = '';
      this.nomeCliente = '';
    } else {
      this.nomeCliente = this.instituicaoSelecionada.nome;
      this.clienteService.setInstituicao(null);
    }
    
    this.setFormulario();
    this.listarFormaPagamento();
    this.listarPlanoContas();
    if (this.conta != null) {
      this.planoContaSelecionado = this.conta.planoconta;
      this.formaPagamentoSelecionada = this.conta.formapagamento;
      this.instituicaoSelecionada = this.conta.instituicao;
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
        formapagamento: this.conta.formapagamento,
        conta: this.conta.conta,
        planocontas: this.conta.planoconta,
      });
    } else {
      this.conta = new Contas();
      this.conta.dataemissao = new Date();
      this.instituicaoSelecionada = this.contasService.getInstituicao();
      if (this.instituicaoSelecionada != null) {
        this.nomeCliente = this.instituicaoSelecionada.nome;
      }
    }
  }

  listarPlanoContas() {
    this.planocontaservice.listar().subscribe(
      resposta => {
        this.listaPlanoContas = resposta as any;
      }
    );
  }

  listarFormaPagamento() {
    this.formaPagamentoService.listar().subscribe(
      resposta => {
        this.listaFormaPagamento = resposta as any;
      }
    );
  }

  compararFormaPagamento(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setFormaPagamento() {
    this.formaPagamentoSelecionada = this.formulario.get('formapagamento').value;
  }

  compararPalnoConta(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setPlanoConta() {
    this.planoContaSelecionado = this.formulario.get('planocontas').value;
  }

  compararGrupoConta(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setGrupoConta() {
    if (this.grupoContaSelecionado != null ) {
      this.listarFormaPagamento();
    }
  }

  compararContaBanco(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setContaBanco() {
    this.bancoSelecionado = this.formulario.get('conta').value;
  }

  consultaCliente() {
    this.router.navigate(['/conscliente']);
  }

  salvar(liberarSaldo: boolean) {
    if (this.receber) {
      this.baixar();
    } else {
      this.showModalFluxoCaixaOnClick.hide();
      this.verificarSaldoFluxoCaixa(liberarSaldo);
    }
  }

  incluir() {
    this.conta = this.formulario.value;
    this.conta.instituicao = this.instituicaoSelecionada;
    this.conta.planoconta = this.planoContaSelecionado;
    this.conta.formapagamento = this.formaPagamentoSelecionada;
    this.conta.valorpago = 0;
    this.conta.desconto = 0;
    this.conta.juros = 0;
    this.conta.tipo = 'r';
    this.contasService.salvarCR(this.conta).subscribe(
      resposta => {
        this.conta = resposta as any;
        this.contasService.setContas(null);
        this.contasService.setInstituicao(null);
        this.router.navigate(['/consreceber']);
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  cancelar() {
    this.formulario.reset();
    this.router.navigate(['/consreceber']);
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
      formapagamento: [null],
      conta: [null],
      planocontas: [null],
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
    this.conta.formapagamento = this.formaPagamentoSelecionada;
    this.contasService.baixarCR(this.conta).subscribe(
      resposta => {
        this.conta = resposta as any;
        this.contasService.setContas(null);
        this.contasService.setInstituicao(null);
        this.router.navigate(['/consreceber']);
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
