import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contas } from '../../model/contas';
import { ContasService } from '../../contas.service';
import { Usuario } from 'src/app/usuario/model/usuario';
import { AuthService } from 'src/app/usuario/login/auth.service';
import { Contasarquivos } from '../../model/contasarquivos';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-conspagar',
  templateUrl: './conspagar.component.html',
  styleUrls: ['./conspagar.component.css']
})
export class ConspagarComponent implements OnInit {

  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime = true;
  contas: Contas[];
  contaSelecinada: Contas;
  inscricao: Subscription;
  pagas: boolean;
  file: File;
  usuario: Usuario;
  contaArquivo: Contasarquivos;
  @ViewChild('contasarquivos', null) public showModalContasArquivosOnClick: ModalDirective;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private contasService: ContasService,
    private activeRrouter: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.contaSelecinada = new Contas();
    this.usuario = this.authService.usuario;
    this.pagas = false;
    this.formulario = this.formBuilder.group({
      documento: [null],
      cliente: [null],
      datainicial: [null],
      datafinal: [null],
      tipoConta: ['todas'],
    });
    this.consultar();
  }

  consultar() {
    this.contasService.listarCP().subscribe(
      resposta => {
        this.contas = resposta as any;
      }
    );
    this.formulario.reset();
  }

  pesquisar() {
    // tslint:disable-next-line:prefer-const
    let documento = this.formulario.get('documento').value;
    const cliente = this.formulario.get('cliente').value;
    const datainicial = this.formulario.get('datainicial').value;
    const datafinal = this.formulario.get('datafinal').value;
    const tipoConta = this.formulario.get('tipoConta').value;
    if (cliente === null) {
      const nome = '@';
    }
    if (documento != null) {
      this.pesquisarDocumento(documento);
    } else if ((datainicial != null) && (datafinal != null)) {
      this.pesquisarDataVencimento(tipoConta, datainicial, datafinal, cliente);
    }
  }

  pesquisarDocumento(ducumento: string) {
    this.contasService.pesquisarDocumentoCR(ducumento).subscribe(
      resposta => {
        this.contas = resposta as any;
      }
    );
  }

  pesquisarNome(cliente: string) {
    this.contasService.listarCP().subscribe(
      resposta => {
        this.contas = resposta as any;
      }
    );
  }

  pesquisarDataVencimento(tipoConta: string, dataInicial: string, dataFinal: string, cliente: string) {
    if (tipoConta === 'todas') {
      this.contasService.pesquisarTodasVencimentoCP(dataInicial, dataFinal, cliente).subscribe(
        resposta => {
          this.contas = resposta as any;
        }
      );
    } else if (tipoConta === 'pagas') {
      this.contasService.pesquisarRecebidasVencimentoCP(dataInicial, dataFinal, cliente).subscribe(
        resposta => {
          this.contas = resposta as any;
        }
      );
    } else if (tipoConta === 'pagar') {
      this.contasService.pesquisarReceberVencimentoCP(dataInicial, dataFinal, cliente).subscribe(
        resposta => {
          this.contas = resposta as any;
        }
      );
    }
  }

  editar(conta: Contas) {
    this.contasService.setReceber(false);
    this.contasService.setContas(conta);
    this.router.navigate(['/cadpagar']);
  }

  adicionar() {
    this.contasService.setContas(null);
    this.contasService.setReceber(false);
    this.router.navigate(['/cadpagar']);
  }

  baixar(conta: Contas) {
    this.contasService.setContas(conta);
    this.contasService.setReceber(true);
    this.router.navigate(['/cadpagar']);
  }

  onChange(event) {
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;
    this.file = selectedFiles[0];
    document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;
  }

 openModalContasArquivos(conta: Contas) {
        this.contaSelecinada = conta;
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
    this.contaArquivo.contas = this.contaSelecinada;
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
    const id = this.contaSelecinada.idcontas;
    const numeroArquivos = this.contaSelecinada.contasarquivos.length + 1;
    fileName = id.toString() + '_'  + numeroArquivos.toString() + '.' + nome;
     this.contasService.uploadPagar(this.file, fileName).subscribe(
        resposta => {
          const uri = resposta as any;
          this.contaArquivo.uri = 'https://contaspagar.s3.us-east-2.amazonaws.com/' + fileName;
          this.contasService.salvarArquivo(this.contaArquivo).subscribe(
           resposta1 => {
             this.contaArquivo = resposta1 as any;
             this.contaSelecinada.contasarquivos.push(this.contaArquivo);
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
