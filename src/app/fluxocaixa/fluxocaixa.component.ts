import { ContasService } from './../contas/contas.service';
import { Contasarquivos } from './../contas/model/contasarquivos';
import { Instituicao } from 'src/app/cliente/model/instituicao';
import { Fluxocontas } from './model/fluxoconta';
import { Fluxolancamento } from './model/fluxolancamento';
import { FluxocaixaService } from './fluxocaixa.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Fluxocaixa } from './model/fluxocaixa';
import { Subscription } from 'rxjs/internal/Subscription';
import { Contas } from '../contas/model/contas';
import { Formapagamento } from '../formapagamento/model/formapagamento';
import { Planoconta } from '../planocontas/model/planoconta';
import {ModalDirective} from 'ngx-bootstrap';
import { Usuario } from '../usuario/model/usuario';
import { AuthService } from '../usuario/login/auth.service';


@Component({
  selector: 'app-fluxocaixa',
  templateUrl: './fluxocaixa.component.html',
  styleUrls: ['./fluxocaixa.component.scss']
})
export class FluxocaixaComponent implements OnInit {

  titulo: String;
  pformulario: FormGroup;
  lformulario: FormGroup;
  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime = true;
  fluxoCaixa: Fluxocaixa[];
  inscricao: Subscription;
  fluxoCaixaSelecionado: Fluxocaixa;
  paga: boolean;
  recebida: boolean;
  conta: Contas;
  codigobarras: string;
  @ViewChild('contas', null) public showModalContasOnClick: ModalDirective;
  @ViewChild('lancamentos', null) public showModalLancamentosOnClick: ModalDirective;
  @ViewChild('contasarquivos', null) public showModalContasArquivosOnClick: ModalDirective;
  usuario: Usuario;
  file: File;
  contaArquivo: Contasarquivos;
  pesquisaData: Date;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private fluxoCaixaService: FluxocaixaService,
    private activeRrouter: ActivatedRoute,
    private authService: AuthService,
    private contasService: ContasService,
  ) {
    this.conta = new Contas;
    this.conta.instituicao = new Instituicao;
    this.conta.instituicao.nome = '';
    this.conta.planoconta = new Planoconta();
    this.conta.planoconta.descricao = '';
    this.conta.formapagamento = new Formapagamento();
    this.conta.formapagamento.descricao = '';
    this.setFormulario(this.conta);
  }

  ngOnInit() {
    this.usuario = this.authService.usuario;
    this.iniciarFormularioLancamentos();
    this.titulo = 'Conta';
    this.fluxoCaixaSelecionado = new Fluxocaixa();
    this.pformulario = this.formBuilder.group({
      datainicial: [null],
      datafinal: [null],
    });
    let data: Date;
    this.activeRrouter.params.subscribe(params => {
      data = params.data;
      if (data != null) {
        this.fluxoCaixaService.getData(data).subscribe(
          resposta => {
            this.fluxoCaixa = resposta as any;
            if (this.fluxoCaixa.length > 0) {
              this.selectFluxoCaixa(this.fluxoCaixa[0]);
            }
          },
            err => {
              console.log(err.error.erros.join(' '));
          }
          );
      } else {
        this.listar();
      }
    },
      err1 => {
        console.log(err1.error.erros.join(' '));
    }
    );
  }

  listar() {
    this.fluxoCaixaService.listarInicial().subscribe(
      resposta => {
        this.fluxoCaixa = resposta as any;
        if (this.fluxoCaixaService != null) {
          if (this.fluxoCaixa.length > 0 ) {
            if (this.fluxoCaixa[0].fluxolancamentoList == null) {
              this.fluxoCaixa[0].fluxolancamentoList.push(new Fluxolancamento());
            }
            if (this.fluxoCaixa[0].fluxocontasList == null) {
            }
            this.selectFluxoCaixa(this.fluxoCaixa[0]);
            this.setFormulario(this.fluxoCaixa[0].fluxocontasList[0].contas);
          }
        }
      }
    );
  }

  selectFluxoCaixa(fluxoCaixa: Fluxocaixa) {
    this.fluxoCaixaSelecionado = fluxoCaixa;
  }

  setFormulario(conta: Contas) {
    this.formulario = this.formBuilder.group({
      idcontas: conta.idcontas,
      documento: conta.documento,
      dataemissao: conta.dataemissao,
      datavencimento: conta.datavencimento,
      numeroparcela: conta.numeroparcela,
      valorparcela: conta.valorparcela,
      desconto: conta.desconto,
      juros: conta.juros,
      datapagamento: conta.datapagamento,
      valorpago : conta.valorpago,
      observacao: conta.observacao,
      instituicao: conta.instituicao,
      planocontas: conta.planoconta.descricao,
      formapagamento: conta.formapagamento.descricao,
    });
  }

  IniciaFormularioContas() {
    let instituicao: Instituicao;
    instituicao = new Instituicao();
    instituicao.nome = '';
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
      valorpago : 0,
      observacao: [null],
      instituicao: [null],
      planocontas: [null],
      formapagamento: new Formapagamento(),
    });
  }

  iniciarFormularioLancamentos() {
    this.lformulario = this.formBuilder.group({
      idfluxolancamento: [null],
      data: [null],
      valorentrada: [null],
      valorsaida: [null],
      planoconta: [null],
      formapagamento: [null],
      fluxocaixa: [null],
      usuario: [null],
    });
  }

  setFormularioLancamentos(fluxolancamento: Fluxolancamento) {
    this.lformulario = this.formBuilder.group({
      idfluxolancamento: fluxolancamento.idfluxolancamento,
      data: fluxolancamento.data,
      valorentrada: fluxolancamento.valorentrada,
      valrosaida: fluxolancamento.valorsaida,
      planoconta: fluxolancamento.planoconta.descricao,
      formapagamento: fluxolancamento.formapgamento.descricao,
      fluxocaixa: fluxolancamento.fluxocaixa,
      usuario: fluxolancamento.usuario,
    });
  }

  openModalContas(fluxoconta: Fluxocontas) {
    this.formulario.reset();
    this.setFormulario(fluxoconta.contas);
    if (fluxoconta.contas.tipo === 'R') {
      if (fluxoconta.contas.valorpago === 0) {
        this.recebida = false;
      } else {
        this.recebida = true;
      }
      this.titulo = 'Contas a receber';
      this.paga = false;
    } else {
      if (fluxoconta.contas.valorpago === 0) {
        this.paga = false;
      } else {
        this.paga = true;
      }
      this.recebida = false;
      this.titulo = 'Contas a pagar';
    }
    this.showModalContasOnClick.show();
  }

  openModalLancamentos(fluxolancamento: Fluxolancamento) {
    this.lformulario.reset();
    this.setFormularioLancamentos(fluxolancamento);
    this.showModalLancamentosOnClick.show();
  }

  pesquisar(data: Date) {
    if (data == null) {
      if (this.fluxoCaixa.length > 0) {
        data = this.fluxoCaixa[this.fluxoCaixa.length - 1 ].data;
        data.setDate(data.getDate() + 1);
      } else {
        data = new Date();
      }
    }
    this.fluxoCaixaService.listarInicial().subscribe(
      resposta => {
        this.fluxoCaixa = resposta as any;
        if (this.fluxoCaixaService != null) {
          if (this.fluxoCaixa.length > 0 ) {
            if (this.fluxoCaixa[0].fluxolancamentoList == null) {
              this.fluxoCaixa[0].fluxolancamentoList.push(new Fluxolancamento());
            }
            if (this.fluxoCaixa[0].fluxocontasList == null) {
            }
            this.selectFluxoCaixa(this.fluxoCaixa[0]);
            this.setFormulario(this.fluxoCaixa[0].fluxocontasList[0].contas);
          }
        }
      }
    );
  }

  contaPaga(conta: Contas) {
    if (conta.datapagamento != null) {
        return true;
    } else {
      return false;
    }
  }

  contaTipo(conta: Contas) {
    if (conta.tipo === 'r') {
        return true;
    } else {
      return false;
    }
  }



  openModalContasArquivos(conta: Contas) {
    this.conta = conta;
    this.showModalContasArquivosOnClick.show();
  }

  copiarCodigoBarras(conta: Contas) {
    let cb = 'SEM CÓDIGO DE BARRAS';
    if (conta.codigobarras != null ) {
      cb = conta.codigobarras;
    }
    const event = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', cb);
      e.preventDefault();
      document.removeEventListener('copy', event);
  };
  document.addEventListener('copy', event);
  document.execCommand('copy');
  }


  onUpload() {
    this.contaArquivo = new Contasarquivos();
    this.contaArquivo.contas = this.conta;
    this.contaArquivo.nomeorigial = this.file.name;
    let fileName = this.file.name;
    let nome = '';
    for (let i = fileName.length - 1; i > 0; i--) {
      if (fileName[i] !== '.' ) {
         nome = fileName[i] + nome;
      } else {
        i = -100;
      }
    }
    const id = this.conta.idcontas;
    let numeroArquivos = 0;
    if (this.conta.contasarquivosList == null) {
      this.conta.contasarquivosList = [];
      numeroArquivos = 1;
    } else {
      numeroArquivos = this.conta.contasarquivosList.length + 1;
    }
    fileName = id.toString() + '_'  + numeroArquivos.toString() + '.' + nome;
    if (this.conta.tipo === 'p') {
     this.contasService.uploadPagar(this.file, fileName).subscribe(
        resposta => {
          const uri = resposta as any;
          this.contaArquivo.uri = 'https://contaspagar.s3.us-east-2.amazonaws.com/' + fileName;
          this.contasService.salvarArquivo(this.contaArquivo).subscribe(
           resposta1 => {
             this.contaArquivo = resposta1 as any;
             this.conta.contasarquivosList.push(this.contaArquivo);
           },
           err1 => {
             console.log(err1.error.erros.join(' '));
            }
           );
        },
        err => {
         console.log(err.error.erros.join(' '));
        }
     );
    } else {
      this.contasService.uploadReceber(this.file, fileName).subscribe(
        resposta => {
          const uri = resposta as any;
          this.contaArquivo.uri = 'https://contaspagar.s3.us-east-2.amazonaws.com/' + fileName;
          this.contasService.salvarArquivo(this.contaArquivo).subscribe(
           resposta1 => {
             this.contaArquivo = resposta1 as any;
             this.conta.contasarquivosList.push(this.contaArquivo);
           },
           err1 => {
             console.log(err1.error.erros.join(' '));
            }
           );
        },
        err => {
         console.log(err.error.erros.join(' '));
        }
     );
    }
  }

  onChange(event) {
    const selectedFiles = <FileList>event.srcElement.files;
    this.file = selectedFiles[0];
    document.getElementById('customFileLabelFluxo').innerHTML = selectedFiles[0].name;
 }
}
