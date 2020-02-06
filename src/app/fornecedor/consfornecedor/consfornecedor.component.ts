import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Instituicao } from 'src/app/cliente/model/instituicao';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-consfornecedor',
  templateUrl: './consfornecedor.component.html',
  styleUrls: ['./consfornecedor.component.scss']
})
export class ConsfornecedorComponent implements OnInit {

  formulario: FormGroup;
    isFirstOpen = false;
    oneAtATime: true;
    instituicao: any[];
    rotaAnterior: string;
    habilitarConsulta = true;
    inscricao: Subscription;
    dataInicial: Date;
    dataFinal: Date;
    usuario: Usuario;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private clienteService: ClienteService,
        private activeRrouter: ActivatedRoute,
        private authService: AuthService,
    ) {
    }


    ngOnInit() {
        this.usuario = this.authService.usuario;
        this.inscricao = this.activeRrouter.params.subscribe(params => {
            this.rotaAnterior = params.rota;
        });
        if (this.rotaAnterior === null) {
            this.habilitarConsulta = false;
        } else {
            this.habilitarConsulta = true;
        }
        this.formulario = this.formBuilder.group({
            nome: [null],
            email: [null],
        });
        this.consultar();
    }


    consultar() {
        this.formulario.reset();
        this.clienteService.listar('f').subscribe(
            resposta => {
                this.instituicao = resposta as any;
            }
        );
    }

    pesquisar() {
        const nome = this.formulario.get('nome').value;
        const email = this.formulario.get('email').value;
        this.clienteService.pesquisar(nome, email).subscribe(
            resposta => {
                this.instituicao = resposta as any;
            }
        );
    }

    editar(instituicao: Instituicao) {
        this.clienteService.setInstituicao(instituicao);
        this.router.navigate(['cadfornecedor']);
    }

    selecionarCliente(clienteSelecionado: Instituicao) {
      /*  if (this.rotaAnterior === 'bens') {
            this.router.navigate(['/cadbens', 'e', clienteSelecionado.idinstituicao, 'conscliente']);
        } else if (this.rotaAnterior === 'contasr') {
            this.contasService.setInstituicao(clienteSelecionado);
            this.router.navigate(['/cadreceber']);
        } else if (this.rotaAnterior === 'contasp') {
            this.contasService.setInstituicao(clienteSelecionado);
            this.router.navigate(['/cadpagar']);
        } */
    }


}
