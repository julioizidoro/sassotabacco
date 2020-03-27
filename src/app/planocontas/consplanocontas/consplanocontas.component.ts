import { Planoconta } from './../model/planoconta';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { PlanoContasService } from '../planocontas.service';
import { Router } from '@angular/router';
import { GrupoContasService } from 'src/app/grupocontas/grupocontas.service';
import { Grupoplanoconta } from 'src/app/grupocontas/model/grupoplanoconta';
import { Usuario } from 'src/app/usuario/model/usuario';
import { AuthService } from 'src/app/usuario/login/auth.service';

@Component({
  selector: 'app-consplanocontas',
  templateUrl: './consplanocontas.component.html',
  styleUrls: ['./consplanocontas.component.css']
})
export class ConsPlanoContasComponent implements OnInit {

    formulario: FormGroup;
    isFirstOpen = false;
    oneAtATime = true;
    planoContas: Planoconta[];
    listaGrupoplanoconta: Grupoplanoconta[];
    grupoContasSelecionado: Grupoplanoconta;
    usuario: Usuario;



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private grupocontasservice: GrupoContasService,
    private planocontaservice: PlanoContasService,
    private authService: AuthService,
  ) {}



  ngOnInit() {3
    this.usuario = this.authService.usuario;
    this.formulario = this.formBuilder.group({
      conta: [null],
      descricao: [null],
      grupocontas: [null]
    });
    this.listarGrupoConta();
    this.consultar();
  }

  consultar() {
    this.planocontaservice.listar().subscribe(
      resposta => {
        this.planoContas = resposta as any;
      }
    );
  }

  listarGrupoConta() {
    this.grupocontasservice.listar().subscribe(
      resposta => {
        this.listarGrupoConta = resposta as any;
      }
    );
  }

  compararGrupo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setGrupo() {
    this.grupoContasSelecionado = this.formulario.get('grupocontas').value;
  }

  pesquisar() {
    const descricao = this.formulario.get('descricao').value;
    if ( descricao != null) {
        this.planocontaservice.pesquisarDescricao(descricao).subscribe(
          resposta => {
            this.planoContas = resposta as any;
          }
        );
    } else {
     const conta = this.formulario.get('conta').value;
     if (( conta != null ) && ( conta.length > 0)) {
        this.planocontaservice.pesquisarConta(conta).subscribe(
          resposta => {
           this.planoContas = resposta as any;
          }
        );
      } else {
          if ( this.grupoContasSelecionado != null ) {
            this.planocontaservice.pesquisarGrupo(this.grupoContasSelecionado.idgrupoplanoconta).subscribe(
              resposta => {
               this.planoContas = resposta as any;
              }
            );
          }
        }
      }
    this.formulario.reset();
   }

  editar(conta: Planoconta) {
    this.planocontaservice.setPlanoConta(conta);
    this.router.navigate([ '/cadplanocontas']);
  }

}
