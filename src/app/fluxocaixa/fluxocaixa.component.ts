import { ContasService } from './../contas/contas.service';
import { Contasarquivos } from './../contas/model/contasarquivos';
import { Instituicao } from 'src/app/cliente/model/instituicao';
import { Fluxocontas } from './model/fluxoconta';
import { Fluxolancamento } from './model/fluxolancamento';
import { FluxocaixaService } from './fluxocaixa.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, SelectMultipleControlValueAccessor } from '@angular/forms';
import { Fluxocaixa } from './model/fluxocaixa';
import { Subscription } from 'rxjs/internal/Subscription';
import { Contas } from '../contas/model/contas';
import { Formapagamento } from '../formapagamento/model/formapagamento';
import { Planoconta } from '../planocontas/model/planoconta';
import { ModalDirective } from 'ngx-bootstrap';
import { Usuario } from '../usuario/model/usuario';
import { AuthService } from '../usuario/login/auth.service';
import { Fluxomostrar } from './model/fluxomostrar';
import { Conta } from '../conta/model/conta';
import { ContaService } from '../conta/conta.service';
import { ThrowStmt } from '@angular/compiler';
import { ContasaldoService } from '../contas/contasaldo.service';
import { Contasaldo } from '../conta/model/contasaldo';
import { Grupoplanoconta } from '../grupocontas/model/grupoplanoconta';
import { PlanoContasService } from '../planocontas/planocontas.service';
import { GrupoContasService } from '../grupocontas/grupocontas.service';


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
  pesFormulario: FormGroup;
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
  listaFluxoMostrar: Fluxomostrar[];
  listaContaSaldo: Contasaldo[];
  //Campos de filtro;
  querydataConta: string;
  querydocumento: string;
  querydescricao: string;
  queryidgrupoconta: number;
  queryidplanoconta: number;
  queryvalorentrada: number;
  queryvalorsaida: number
  queryidconta: number;
  listaFluxoFiltro: Fluxomostrar[];
  listaPlanoContas: Planoconta[];
  listaBancos: Conta[];
  bancoSelecionado: Conta;
  planoContaSelecionado: Planoconta;
  grupoContaSelecionado : Grupoplanoconta;
  listaGrupoContas: Grupoplanoconta[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private fluxoCaixaService: FluxocaixaService,
    private authService: AuthService,
    private contasService: ContasService,
    private contaSaldoService: ContasaldoService,
    private planocontaservice: PlanoContasService,
    private contaService: ContaService,
    private grupoContaService: GrupoContasService,
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
    this.iniciarFormularioPesquisar();
    this.titulo = 'Conta';
    this.fluxoCaixaSelecionado = new Fluxocaixa();
    this.pformulario = this.formBuilder.group({
      datainicial: [null],
      datafinal: [null],
    });
    this.listarConta();
    this.listar();
    this.listarGrupoPlanoContas();
    this.listarContaBanco();
  }

  listarConta() {
    this.contaSaldoService.listarMesAno('@').subscribe(
      resposta => {
        this.listaContaSaldo = resposta as any;
        if (this.listaContaSaldo.length>0) {
          this.titulo = 'Fluxo de Caixa - ' + this.listaContaSaldo[0].mesano; 
          console.log(this.titulo); 
        }
      },
      err => {
        console.log(err.error.erros.join(' '));
      }
    );
  }

  listar() {
    this.fluxoCaixaService.listarInicial().subscribe(
      resposta => {
        this.fluxoCaixa = resposta as any;
        if (this.fluxoCaixaService != null) {
          if (this.fluxoCaixa.length > 0) {
            this.listaFluxoMostrar = [];
            for (let f of this.fluxoCaixa) {
              for (let fc of f.fluxocontasList) {
                let fm = new Fluxomostrar();
                fm.fluxocaixa = f;
                fm.documento = fc.contas.documento;
                fm.descricao = fc.contas.instituicao.nome;
                fm.grupoplanoconta = fc.contas.planoconta.grupoplanoconta;
                fm.planoconta = fc.contas.planoconta;
                if (fc.contas.tipo === 'r') {
                  fm.tipo = 'r';
                  fm.valorsaida = 0;
                  if (fc.contas.valorpago > 0) {
                    fm.valorentrada = fc.contas.valorpago;
                    fm.realizado = true
                  } else {
                    fm.valorentrada = fc.contas.valorparcela;
                    fm.realizado = false;
                  }
                } else if (fc.contas.tipo === 'p') {
                  fm.tipo = 'p';
                  fm.valorentrada = 0;
                  if (fc.contas.valorpago > 0) {
                    fm.valorsaida = fc.contas.valorpago;
                    fm.realizado = true
                  } else {
                    fm.valorsaida = fc.contas.valorparcela;
                    fm.realizado = false;
                  }
                }
                this.listaFluxoMostrar.push(fm);
              }
              for (let fl of f.fluxolancamentoList) {
                let fm = new Fluxomostrar();
                fm.fluxocaixa = f;
                fm.tipo = 'c';
                fm.descricao = fl.planoconta.descricao;
                fm.grupoplanoconta = fl.planoconta.grupoplanoconta;
                fm.planoconta = fl.planoconta;
                fm.valorentrada = fl.valorentrada;
                fm.valorsaida = fl.valorsaida;
                fm.realizado = true
                this.listaFluxoMostrar.push(fm);
              }

            }
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
      valorpago: conta.valorpago,
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
      valorpago: 0,
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
        data = this.fluxoCaixa[this.fluxoCaixa.length - 1].data;
        data.setDate(data.getDate() + 1);
      } else {
        data = new Date();
      }
    }
    this.fluxoCaixaService.listarInicial().subscribe(
      resposta => {
        this.fluxoCaixa = resposta as any;
        if (this.fluxoCaixaService != null) {
          if (this.fluxoCaixa.length > 0) {
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
    if (conta.codigobarras != null) {
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
      if (fileName[i] !== '.') {
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
    fileName = id.toString() + '_' + numeroArquivos.toString() + '.' + nome;
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


  getTipoCash(tipo: string) {
    if (tipo === 'c') {
      return true;
    } else return false;
  }

  getTipoCR(tipo: string) {
    if (tipo === 'r') {
      return true;
    } else return false;
  }

  getTipoCP(tipo: string) {
    if (tipo === 'p') {
      return true;
    } else return false;
  }

  filtrar() {
    this.listaFluxoFiltro = [];
    this.listaFluxoFiltro = this.listaFluxoMostrar;
    this.listaFluxoMostrar = [];
    this.querydataConta = this.pesFormulario.get('dia').value;
    this.querydescricao = this.pesFormulario.get('descricao').value;
    this.querydocumento = this.pesFormulario.get('documento').value;
    if (this.bancoSelecionado!=null) {
      this.queryidconta = this.bancoSelecionado.idconta;
    } else this.queryidconta = null;
    if (this.grupoContaSelecionado !=null ) {
      this.queryidgrupoconta = this.grupoContaSelecionado.idgrupoplanoconta;
    }else this.queryidgrupoconta = null;
    if (this.planoContaSelecionado != null) {
      this.queryidplanoconta = this.planoContaSelecionado.idplanoconta;
    }
    this.queryvalorentrada = this.pesFormulario.get('entrada').value;
    this.queryvalorsaida = this.pesFormulario.get('saida').value;
    //Data
    for (let i = 0; i < this.listaFluxoFiltro.length; i++) {
      if (this.querydataConta != null) {
        this.querydataConta =  this.querydataConta + this.listaContaSaldo[0].mesano;
        let dia = this.listaFluxoMostrar[i].fluxocaixa.data.getDay.toString;
        let novo = this.querydataConta;
        if ( dia.toString() !=novo) {
          this.listaFluxoMostrar.slice[i]
        }
      }
    }
    for (let i = 0; i < this.listaFluxoFiltro.length; i++) {
      //Documento
      if (this.querydocumento != null) {
        if (this.listaFluxoMostrar[i].documento != this.querydocumento) {
          this.listaFluxoMostrar.slice[i]
        }
      }
    }
    for (let i = 0; i < this.listaFluxoFiltro.length; i++) {
      //Descrição
      if (this.querydescricao != null) {
        if (!this.listaFluxoMostrar[i].descricao.includes(this.querydescricao)) {
          this.listaFluxoMostrar.slice[i]
        }
      }
    }
    //Grupo Plano de contas
    for (let i = 0; i < this.listaFluxoFiltro.length; i++) {
      if (this.queryidgrupoconta > 0) {
        if (this.listaFluxoMostrar[i].grupoplanoconta.idgrupoplanoconta != this.queryidgrupoconta) {
          this.listaFluxoMostrar.slice[i]
        }
      }
    }
    //Plano de contas
    for (let i = 0; i < this.listaFluxoFiltro.length; i++) {
      if (this.queryidplanoconta > 0) {
        if (this.listaFluxoMostrar[i].planoconta.idplanoconta != this.queryidgrupoconta) {
          this.listaFluxoMostrar.slice[i]
        }
      }
    }
    //Conta
    for (let i = 0; i < this.listaFluxoFiltro.length; i++) {
      if (this.queryidconta > 0) {
        if (this.listaFluxoMostrar[i].fluxocaixa.conta.idconta != this.queryidconta) {
          this.listaFluxoMostrar.slice[i]
        }
      }
    }
    //Valor de entradas
    for (let i = 0; i < this.listaFluxoFiltro.length; i++) {
      if (this.queryvalorentrada > 0) {
        if (this.listaFluxoMostrar[i].valorentrada != this.queryvalorentrada) {
          this.listaFluxoMostrar.slice[i]
        }
      }
    }
    //Valor de Saidas
    for (let i = 0; i < this.listaFluxoFiltro.length; i++) {
      if (this.queryvalorsaida > 0) {
        if (this.listaFluxoMostrar[i].valorsaida != this.queryvalorsaida) {
          this.listaFluxoMostrar.slice[i]
        }
      }
    }
  }

  iniciarFormularioPesquisar() {
    this.pesFormulario = this.formBuilder.group({
      dia: [null],
      documento: [null],
      descricao: [null],
      grupoconta: [null],
      planoconta: [null],
      conta: [null],
      entrada: [null],
      saida: [null],
    });  
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
    this.planoContaSelecionado = this.pesFormulario.get('planoconta').value;
  }

  compararGrupoConta(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setGrupoConta() {
    console.log('grupoconta');
    this.grupoContaSelecionado = this.pesFormulario.get('grupoconta').value;
    if (this.grupoContaSelecionado != null ) {
      this.listarPlanoContas();
    }
  }

  compararContaBanco(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setContaBanco() {
    this.bancoSelecionado = this.pesFormulario.get('conta').value;
  }

  limparPesquisa() {
    this.pesFormulario.reset();
    this.listaFluxoMostrar = this.listaFluxoFiltro;
  }


}
